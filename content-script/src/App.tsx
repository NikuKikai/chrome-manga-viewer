/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import { } from 'react-dom'
import { useWindowSize } from "@react-hook/window-size";
import MangaViewer from "react-manga-viewer";

import "./App.css";


function App() {
  const [width, height] = useWindowSize();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [urls, setUrls] = React.useState<string[]>([]);


  const close = () => {
    setVisible(false);
  }


  const init = () => {
    setTimeout(()=>{
      // Insert button
      const heads = document.getElementsByClassName('head-info_time_6sFQg');  // NOTE not suitable for retweet
      const boxs = document.getElementsByClassName('woo-box-wrap');
      for (let ibox=0; ibox<boxs.length; ibox++) {
        const box = boxs.item(ibox)! as HTMLDivElement;
        const head = heads.item(ibox)!;
        const parent = head.parentElement! as HTMLDivElement;

        if (parent.getElementsByTagName('button').length) continue;

        // Create button
        const btn = document.createElement('button');
        btn.innerHTML = 'Manga View';
        btn.id = 'manga-viewer-btn'
        btn.onclick = () => {
          setVisible(true);

          // Get images
          const divs = box!.getElementsByClassName('woo-box-item-inlineBlock');

          const _urls = [] as string[];

          for (let i=0; i<divs.length; i++) {
            const div = divs.item(i) as HTMLDivElement;
            // if (div.getElementsByClassName('picture_picNum_3r6Z2').length > 0) { // Means more images hidden  // TODO
            // }

            const img = div.getElementsByTagName('img').item(0);
            if (!img) continue;
            console.log(img.src);
            _urls.push(img.src.replace('orj360', 'mw690'));
          }
          setUrls(_urls);
        }
        parent.appendChild(btn);

      }

    }, 1000);

  }


  React.useLayoutEffect(()=>{
    const rootElement = document.getElementById('app');
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // console.log('Address bar changed:', window.location.href);
        if (/^https?:\/\/weibo\.com\/\d+\/[^\/]+/.test(window.location.href))
          init();
      });
    });
    if (rootElement) {
      observer.observe(rootElement, { childList: true, subtree: true });
    }

    if (/^https?:\/\/weibo\.com\/\d+\/[^\/]+/.test(window.location.href))
      init();

    return () => {
      observer.disconnect();
    }
  }, [])


  if (visible) return (
    <div className='App' style={{visibility: visible?'visible':'hidden'}}>
      <MangaViewer width={width} height={height} urls={urls} noLoading={false}></MangaViewer>
      <div style={{position: 'absolute', left: 0, top: 0, cursor: 'pointer'}}>
        <span style={{color: 'gray', fontSize: '2em', fontWeight: 'bolder', margin: '10px'}} onClick={close}>✕</span>
      </div>
    </div>
  )
  return null;

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <p>Hello, World!</p>
  //       <p>I'm a Chrome Extension Content Script!</p>
  //     </header>
  //   </div>
  // );
}

export default App;
