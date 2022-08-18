import React from 'react';
import MenuView from './MenuView';
import AddScheduleView from './AddScheduleView';
import MainCalendar from './MainCalendar'
let scrollTimer : NodeJS.Timeout;
let mainDOM : HTMLElement;
let isTouching = false;

class App extends React.Component<{}, {date : Date}> {

  constructor(props: {} | Readonly<{}>){
    super(props);
    this.state = {date : new Date()};
  }
  
  componentDidMount() {
    
    const dom = document.querySelector("main");
    
    if(dom)mainDOM = dom;
    
    if(mainDOM){
      this.showCurrentMonth();

      mainDOM.addEventListener("touchstart", ()=>isTouching = true)
      mainDOM.addEventListener("scroll", (e) => {
        if(!isTouching)return;
        if(scrollTimer)clearTimeout(scrollTimer);
        scrollTimer = setTimeout(()=>this.scrollEnd(mainDOM), 200)
      });
    }
  }

  componentDidUpdate() {
    this.showCurrentMonth();
  }

  showCurrentMonth(){
    // 左から2つ目(現在の月)のカレンダーを表示する
    mainDOM.scrollLeft = document.body.clientWidth; 
  }  

  scrollEnd(dom : HTMLElement){
    isTouching = false;
    if(scrollTimer)clearTimeout(scrollTimer);
    const selectedMonthIndex = Math.floor(dom.scrollLeft / document.body.clientWidth);
    if(selectedMonthIndex === 0){
      this.setState({date : new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, 1)});
    }else if(selectedMonthIndex === 2){
      this.setState({date : new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 1)});
    }
    
  }


  render(){
    return (
      <>
      <MenuView visible={false} />
      <AddScheduleView />
      <MainCalendar date={this.state.date}/>
      <div style={{"position":"absolute","right":"10px", "bottom":"50px"}}>
        <div className='button'><span className='material-icons' onClick={()=>{this.setState({date : new Date()})}}>today</span></div>
      </div>
      </>
    );
  }
}

export default App;
