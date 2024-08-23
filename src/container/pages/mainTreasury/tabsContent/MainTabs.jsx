import React from 'react'
import GlobalTabs from '../../../../components/common/tabs/Tabs'
import Forwards from './forwards/Forwards';
import { Container } from 'react-bootstrap';
import Discounting from './discounting/Discounting';
import LiveRates from './liveRates/LiveRates';

const MainTabs = () => {

    const tabsData = [
        { title: 'Live Rates', content: <LiveRates /> },
        { title: 'Forwards', content: <Forwards /> },
        { title: 'Discounting', content: <Discounting /> }
    ];

    return (
        <Container fluid className='page-gutter'>
            <GlobalTabs tabs={tabsData} defaultActiveKey={"2"} />
        </Container>
    )
}

export default MainTabs