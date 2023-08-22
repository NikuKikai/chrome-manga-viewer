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
  const [direction, setDirection] = React.useState<'rtl'|'ltr'>('rtl');
  const [start1side, setStart1side] = React.useState<boolean>(false);


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
        btn.className = 'EntryButton';
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

  const close = () => {
    setVisible(false);
  }

  const switchDirection = () => {
    if (direction==='rtl')
      setDirection('ltr');
    else
      setDirection('rtl');
  }

  const switchStart1side = () => {
    setStart1side(!start1side);
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
      <MangaViewer
        width={width}
        height={height}
        urls={urls}
        direction={direction}
        start_1side={start1side}
        noLoading={false}
      ></MangaViewer>

      <div style={{position: 'absolute', right: '10px', top: 0}}>
        <span className='Button' onClick={switchDirection}>{direction==='rtl'? 'RtoL': 'LtoR'}</span>
        <span style={{marginRight: '20px'}}></span>
        <span className='Button' onClick={switchStart1side}>{start1side? 'Sided': 'Spread'}</span>
      </div>

      {/* Close */}
      <div style={{position: 'absolute', left: 0, top: 0}}>
        <span className='Button' onClick={close}>✕</span>
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
