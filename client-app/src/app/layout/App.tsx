import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingCompoent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadinActivities();

  }, [activityStore])


  if (activityStore.loadInitial) return <LoadingComponent inverted={true} content={'loading app ...'} />
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>

    </>
  );
}

export default observer(App);
