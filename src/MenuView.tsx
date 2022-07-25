import React from 'react';

interface MenuViewProps{
  visible : boolean
}

function MenuView(props : MenuViewProps) {
  return (
    <div id="menuView" className="view" style={props.visible ? {display:"block"} : {display:"none"}}>
        <div className="view-header">設定</div>
        <div className="view-apply" onClick={()=>alert("メニューを閉じる")}>完了</div>
        
        <p className="menu-context">
            バックアップ
        </p>
        <div className="menu-item" onClick={()=>alert("JSONで出力")}>
            JSONで出力
        </div>
        
        <p className="menu-context">
            情報
        </p>
        <div className="menu-item" onClick={()=>alert("バージョン情報")}>
            バージョン情報
        </div>
    </div>
  );
}

export default MenuView;
