export interface Activity{
    id:string;
    name:string;
    description:string;
    price:number;
    duration:number;
    category:string;
    latitude:number;
    longitude:number;
}
export interface ItineraryItem { // retrieved raw LLM response structure
  activity_name: string; 
  activity_type: 'rest' | 'adventure' | 'tourist attraction' | 'commute';
  start_time: string;
  end_time: string;
}

export interface CalendarActivity{
    title:string;
    start:Date;
    end:Date;
    color:string;
    activity_type: 'rest' | 'adventure' | 'tourist attraction' | 'commute';
}