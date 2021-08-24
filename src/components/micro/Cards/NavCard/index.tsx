import React from "react";
import { Tab, Tabs } from "react-bootstrap";

import { useNavCard } from "contexts/NavCard";

import { Container } from "./styles";

const NavCard: React.FC = () => {
    const { tabs, step, gotoStep } = useNavCard();

    return (
        <Container>
            <Tabs id="nav-card" variant="pills" activeKey={step} onSelect={(k) => gotoStep(Number(k))}>
                {tabs.map((tab, index) => (
                    <Tab
                        eventKey={index}
                        title={
                            <>
                                <div className="nav-card-item-icon">{tab.icon}</div>
                                <span>{tab.name}</span>
                            </>
                        }
                        key={tab.id ? tab.id : tab.name.replaceAll(" ", "_")}
                    >
                        {tab.children}
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default NavCard;
