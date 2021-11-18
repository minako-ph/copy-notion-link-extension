let intervalTimer = setInterval(renderLinkBtn, 1000)

function renderLinkBtn() {
  const modal = document.getElementsByClassName('notion-peek-renderer')

  if (modal.length > 0) {
    // 画面全体.モーダル要素.モーダル内toolbar部分.toolbar中身
    const bar = modal[0].childNodes[1].childNodes[0].childNodes[0]
    // 本当はbar[0]みたいけどchildNodesは使えない？
    if (modal[0].getElementsByClassName('copy-link-button').length <= 0) {
      const btn = document.createElement("button")
      btn.id = 'copy-link-button'
      btn.className = 'copy-link-button'
      btn.innerText = 'リンクをコピー'
      bar.appendChild(btn)

      btn.onclick = function(){
        const link = location.href
        // 画面全体.モーダル要素.モーダル内body部分.タイトル部分
        const title_wrap = modal[0].childNodes[1].childNodes[2].childNodes[0]
        const title_texts = title_wrap.innerText.split('\n')
        const title = title_texts[title_texts.length - 1]

        copyRichText(`<a href="${link}">${title}</a>`)
      }
    }
  }
}

function copyRichText(text) {
  const listener = function(ev) {
    ev.preventDefault();
    ev.clipboardData.setData('text/html', text);
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}

renderLinkBtn()
