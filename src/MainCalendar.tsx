import React, { useState } from 'react';
import AddScheduleView from './AddScheduleView';
import DataStore from './dataStore';

interface CalendarProps{
  date : Date
}

function MainCalendar(props : CalendarProps) {
  return (
    <main>
      <Calendar date={new Date(props.date.getFullYear(), props.date.getMonth()-1, 1)}/>
      <Calendar date={props.date}/>
      <Calendar date={new Date(props.date.getFullYear(), props.date.getMonth()+1, 1)}/>
    </main>
  );
}


function Calendar(props : CalendarProps){
  let domArray : JSX.Element[] = [];
  const day1 = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
  for(let i=0; i<day1.getDay(); i++){
      const dayDOM = <div className='cale-item' key={"placeHolder_" + i.toString()}></div>;
      domArray.push(dayDOM);
  }
  const lastday = new Date(props.date.getFullYear(), props.date.getMonth()+1, 0);
  for(let i=1; i<=lastday.getDate(); i++){
      const key = `${lastday.getFullYear().toString()}/${(lastday.getMonth() + 1).toString()}/${i.toString()}`;
      const data = DataStore.Get(key);
      const dayDOM = <div className='cale-item day' id={props.date.getMonth()+1 + "_" + i} key={props.date.getMonth()+1 + "_" + i} onClick={()=>AddScheduleView.ShowScheduleView(key)}>{i.toString()}<br />{data ? data.title : ""}</div>;
      domArray.push(dayDOM);
  }

  return (
    <div className="month-parent" id={`calendar_${props.date.getMonth()+1}`}>
        <div className="calendar">
            <div className="week-parent">
                <div className="cale-item week red">日</div>
                <div className="cale-item week">月</div>
                <div className="cale-item week">火</div>
                <div className="cale-item week">水</div>
                <div className="cale-item week">木</div>
                <div className="cale-item week">金</div>
                <div className="cale-item week blue">土</div>
            </div>
            {
              domArray.map((dom) => {
                return dom;
              })
            }
        </div>
        <div className="month-footer" id={`mf_${props.date.getMonth()+1}`}>
            <p className="monthLabel">{props.date.getFullYear()}年 {props.date.getMonth()+1}月</p>
        </div>
    </div>
  )
}

export default MainCalendar;
