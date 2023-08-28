interface LiveAudioType {
  id: number;
  url: string;
  statkey: string;
}
interface StationType {
  channeltype: string;
  color: string;
  id: 163;
  image: string;
  imagetemplate: string;
  liveaudio: LiveAudioType;
  name: string;
  scheduleurl: string;
  siteurl: string;
  tagline: string;
  xmltvid: string;
}

type PaginationType = {
  page: number;
  size: number;
  totalhits: number;
  totalpages: number;
  nextpage: string;
};

type RadioResponse = {
  copyright: string;
  channels: StationType[];
  pagination: PaginationType;
};
async function getApi(): Promise<void> {
  const response = await fetch(
    "https://api.sr.se/api/v2/channels/?format=json"
  );
  const data: RadioResponse = await response.json();
  console.log(data);
  const channels = document.querySelector(".channels");
  if (channels != null) {
    const div: HTMLDivElement = document.createElement("div");
    div.setAttribute("class", "channel");
    console.log(channels);
    console.log(div);
    for (let i = 0; i < data.channels.length; i++) {
      const channel = data.channels[i];
      div.innerHTML += `<div>${channel.name} - ${channel.tagline}</div>`;
    }
    channels.appendChild(div);
  }
}
getApi();
