import React, {Component} from 'react';
import IconText from './IconText';
import LuckyDrawTips from './LuckyDrawTips';
import ResultAmounts from './ResultAmounts';
import SuccessTips from './SuccessTips';
import Button from './Button';
import FailTips from './FailTips';
import ShowResult from './ShowResult';
import {ResultTotalProps} from './types';

interface ComponentConfig {
    Component: any,
    props: any,
}

interface Config {
    [propName: string]: ComponentConfig,
}


const renderConfig: Config = {
    IconText: {
        Component: IconText,
        props: {
            key: 'IconText',
            status: true,
        }
    },
    FailTips: {
        Component: FailTips,
        props: {
            key: 'FailText',
        }
    },
    LuckyDrawTips: {
        Component: LuckyDrawTips,
        props: {
            key: 'LuckyDrawTips',
            serialNum: '',
        }
    },
    ResultAmounts: {
        Component: ResultAmounts,
        props: {
            key: 'ResultAmounts',
            repayAmount: 0,
        }
    },
    SuccessTips: {
        Component: SuccessTips,
        props: {
            key: 'SuccessTips',
            repayAmount: 0,
        }
    },
    Button: {
        Component: Button,
        props: {
            key: 'Button',
            handleClick: () => {
            },
        }
    }
};

export default class ResultTotal extends Component<ResultTotalProps, {}> {

    get renderList() {
        const {
            hasDraw,
            repayAmount,
            repayResult,
            serialNum
        } = this.props;

        const newList = [];
        newList.push({
            ...renderConfig.IconText,
            props: {
                ...this.copyProps('IconText'),
                status: repayResult
            }
        });
        repayResult && hasDraw && newList.push({
            ...renderConfig.LuckyDrawTips,
            props: {
                ...this.copyProps('LuckyDrawTips'),
                serialNum,
            }
        });

        repayResult || newList.push({
            ...renderConfig.FailTips,
            props: {
                ...this.copyProps('FailTips'),
            }
        });
        newList.push({
            ...renderConfig.ResultAmounts,
            props: {
                ...this.copyProps('ResultAmounts'),
                repayAmount,
            }
        });
        repayResult && newList.push({
            ...renderConfig.SuccessTips,
            props: {
                ...this.copyProps('SuccessTips'),
                repayAmount,
            }
        });
        newList.push({
            ...renderConfig.Button,
            props: {
                ...this.copyProps('Button'),
                handleClick: () => {
                },
            }
        });

        return newList;
    }


    copyProps = (key: string) => ({...renderConfig[key].props});

    render() {
        return (
            <ShowResult componentsToShow={this.renderList}/>
        )
    }
}
