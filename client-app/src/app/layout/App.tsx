import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path={'/*'}

          element={
            <>
              <Navbar />
              <Container style={{ marginTop: '7em' }}>
                <Routes>
                  <Route path='/activities/' element={<ActivityDashboard />} />
                  <Route path='/activities/:id' element={<ActivityDetails />} />
                  <Route path='/manage/:id' element={<ActivityForm />} />
                </Routes>
                <Routes>
                  <Route path='/CreateActivity' element={<ActivityForm />} />
                </Routes>
              </Container>
            </>
          }


        />


      </Routes>



    </>
  );
}

export default observer(App);
