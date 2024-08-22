import React from 'react'
import GlobalTabs from '../../../../components/common/tabs/Tabs'
import Forwards from './forwards/Forwards';
import { Container } from 'react-bootstrap';

const MainTabs = () => {

    const tabsData = [
        { title: 'Live Rates', content: <div>Tab content for Home</div> },
        { title: 'Forwards', content: <Forwards /> },
        { title: 'Discounting', content: <div>Tab content for Contact</div> }
    ];

    return (
        <Container fluid className='page-gutter'>
            <GlobalTabs tabs={tabsData} defaultActiveKey={"0"} />
        </Container>
    )
}

export default MainTabs