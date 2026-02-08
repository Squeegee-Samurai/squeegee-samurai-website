import CityLanding from '../components/CityLanding';

const HerndonHome = () => (
  <CityLanding
    city="Herndon"
    partners={[
      { name: 'Play The Par Social Club', url: 'https://playtheparsocialclub.com/', description: 'Entertainment & Media Partner' },
      { name: 'Understood Tech', url: 'https://understoodtech.com', description: 'Technology Solutions Partner' },
    ]}
  />
);

export default HerndonHome;
