import DoctorCard from "../cards/DoctorCard";
import PatientCard from "../cards/PatientCard";

const HospitalDashboardPage = () => {
  return (
    <div className="h-full flex justify-center items-center pt-16 gap-8">
      <PatientCard />
      <DoctorCard />
    </div>
  );
};

export default HospitalDashboardPage;
