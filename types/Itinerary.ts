interface ItineraryItem {
  activity_name: string;
  activity_type: 'rest' | 'adventure' | 'tourist attraction' | 'commute';
  start_time: string;
  end_time: string;
}

interface Activity{
    title:string;
    start:Date;
    end:Date;
    color:string;
    activity_type: 'rest' | 'adventure' | 'tourist attraction' | 'commute';
}