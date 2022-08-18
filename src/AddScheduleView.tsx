import React from 'react';
import DataStore from './dataStore';

class AddScheduleView extends React.Component<{}, {}> {
  constructor(props: {}){
    super(props);
    this.state = {visible : false};
  }

  static ShowScheduleView(key : string){
    const data = DataStore.Get(key);
    const asv_dom : HTMLElement | null = document.querySelector("#addScheduleView");
    const asv_date : HTMLElement | null = document.querySelector("#addScheduleView_Date");
    const asv_title : HTMLTextAreaElement | null = document.querySelector("#addScheduleTitle");
    const asv_desc  : HTMLInputElement | null = document.querySelector("#addScheduleDesc");
    if(!asv_date || !asv_title || !asv_desc || !asv_dom)return;
    asv_date.innerText = `${key}`;
    asv_title.value = "";
    asv_desc.value = "";
    if(data){
      asv_title.value = data.title;
      asv_desc.value = data.text;
    }
    asv_dom.style.animation = ".4s ease View";
    setTimeout(()=>asv_dom.style.display = "block", 0.05)
  }

  hide(){
    const asv_dom : HTMLElement | null = document.querySelector("#addScheduleView");
    if(!asv_dom)return;
    asv_dom.style.animation = ".4s ease View2";
    setTimeout(() => asv_dom.style.display = "none", 300);
  }
  
  set(){
    const asv_date : HTMLElement | null = document.querySelector("#addScheduleView_Date");
    const asv_title : HTMLTextAreaElement | null = document.querySelector("#addScheduleTitle");
    const asv_desc  : HTMLInputElement | null = document.querySelector("#addScheduleDesc");
    if(!asv_date || !asv_title || !asv_desc)return;

    if(asv_title.value !== "" || asv_desc.innerText !== ""){
      DataStore.Set({
        key : asv_date.innerText,
        title : asv_title.value,
        text : asv_desc.value
      });
    }

    const changeDOM = document.getElementById(asv_date.innerText.split("/")[1] + "_" + asv_date.innerText.split("/")[2])
    if(changeDOM){
      changeDOM.innerHTML = `${asv_date.innerText.split("/")[2]}<br />${asv_title.value}`;
    }
    this.hide();
  }

  delete(){
    const asv_date : HTMLElement | null = document.querySelector("#addScheduleView_Date");
    if(!asv_date)return;
    if(window.confirm("予定を削除しても宜しいですか？")){
      DataStore.Delete(asv_date.innerText);
      this.hide();
    }
  }

  render(){
    return (
      <div id="addScheduleView" className="view">
          <div className="view-header">スケジュール</div>
          <div className="view-cancel" onClick={()=>this.delete()}>削除</div>
          <div className="view-apply" onClick={()=>this.set()}>完了</div>
  
          <p id="addScheduleView_Date">????/?/?</p>
  
          <input type="text" id="addScheduleTitle" placeholder="予定の名前"/><br/>
          <textarea placeholder="予定の詳細" id="addScheduleDesc" rows={10}></textarea><br/>
          <label id="addScheduleColorParent">カラー
              <input type="color" id="addScheduleColor"/>
          </label>
      </div>
    );
  }

}

export default AddScheduleView;