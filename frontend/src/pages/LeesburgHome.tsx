import CityLanding from '../components/CityLanding';

const LeesburgHome = () => (
  <CityLanding
    city="Leesburg"
    partners={[
      { name: 'Play The Par Social Club', url: 'https://playtheparsocialclub.com/', description: 'Entertainment & Media Partner' },
      { name: 'Understood Tech', url: 'https://understoodtech.com', description: 'Technology Solutions Partner' },
    ]}
  />
);

export default LeesburgHome;
