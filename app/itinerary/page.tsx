import TripCalendar from "@/components/TripCalendar"


const ItineraryPage = () => {
  return (
    <div className="w-full h-full flex">
        <TripCalendar/>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14030.90154293597!2d77.04493215!3d28.457693499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1750012908323!5m2!1sen!2sin" width="600" height="450"  loading="lazy" 
        className="flex-1/3"></iframe>
    </div>
  )
}

export default ItineraryPage