import ServiceCard from "../components/ServiceCard"
import services from "../data/services"

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="  text-3xl font-bold mb-8 ">
        Choose a Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default Home
