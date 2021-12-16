import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingCompoent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadinActivities, activityRegistry } = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) loadinActivities();

    }, [activityRegistry.size, loadinActivities])
    if (activityStore.loadInitial) return <LoadingComponent inverted={true} content={'loading app ...'} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList  />
            </Grid.Column>
            <GridColumn width='6'>
                <ActivityFilters />
            </GridColumn>
        </Grid>
    )

})