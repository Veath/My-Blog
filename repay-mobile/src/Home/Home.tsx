import * as React from 'react';
import { Loading, Tips, Tab, Radio, Button, Dialog, Modal } from '../components';
import MainPanel from './MainPanel'
import ContractList from './ContractList'
import RedPacketBar from './RedPacketBar'
import RedPacketPanel from './RedPacketPanel'
import ControlBar from './ControlBar'
import Empty from './Empty'
import RepayConfirm from './RepayConfirm';

const tipsIcon = require('./images/tips-icon.png');

class Home extends React.Component {
    constructor (props: any) {
        super(props);
    }
    state = {
        tabList: [ // 时间Tab列表
            {
                key: 7,
                value: '近7天待还'
            },
            {
                key: 30,
                value: '近30天待还'
            }
        ],
        repayTypes: [ // 支付方式
            {
                key: 'jd',
                value: '京东支付',
                icon: ''
            },
            {
                key: 'wx',
                value: '微信支付',
                icon: ''
            }
        ],
        currentTabIndex: 1, // 当前选中Tab索引
        currentContractIndex: 0, // 当前选中合同组索引
        showRedPacketBar: true, // 是否显示红包栏
        showRedPacketPanel: false, // 是否显示红包列表面板
        isControlBarTopping: false, // 底部控制栏是否置顶
        callbackType: '', // 回调事件类型,
        redPacketList: [ // 红包列表
            {
                'activityType': 'xx',
                'beginTime': {},
                'doubleTheAmount': '测试内容8fy6',
                'endTime': {},
                'id': 46618,
                'idCredit': 54140,
                'name': '还款红包',
                'price': 50,
                'prizeId': 48286,
                'sendFlag': '测试内容iwp7',
                'status': '测试内容rj27',
                'userId': 1
            },
            {
                'activityType': 'xx',
                'beginTime': {},
                'doubleTheAmount': '测试内容8fy6',
                'endTime': {},
                'id': 46618,
                'idCredit': 54140,
                'name': '还款红包',
                'price': 100,
                'prizeId': 48286,
                'sendFlag': '测试内容iwp7',
                'status': '测试内容rj27',
                'userId': 1
            }
        ],
        redPacketAmount: 0, // 红包金额
        selectedRedPackets: [], // 选中的红包索引数组
    };
    // 选择时间Tab
    selectTab = (e: any) => {
        this.setState({currentTabIndex: +e.target.getAttribute('data-index') || 0})
    };
    // 选择合同
    selectContract = (e: any) => {
        this.setState({currentContractIndex: +e.target.getAttribute('data-index') || 0})
    };
    // 选择红包
    selectRedPacket = (index: number = 0) => {
        // 更新选中状态及选中金额
        let amount: number = this.state.redPacketAmount;
        let list: number[] = this.state.selectedRedPackets;
        if (list.indexOf(index) > -1) {
            list.splice(list.indexOf(index), 1);
            amount -= this.state.redPacketList[index].price
        } else {
            list.push(index);
            amount += this.state.redPacketList[index].price
        }
        this.setState({
            selectedRedPackets: list,
            redPacketAmount: amount
        })
    };
    // 红包列表显示开关
    toggleRedPacketPanel = () => {
        this.setState({
            showRedPacketPanel: !this.state.showRedPacketPanel,
            isControlBarTopping: true,
        })
    };
    // 编辑金额
    editAmount = () => {
        this.setState({isControlBarTopping: false});
        Modal.prompt('请输入您要还款的金额', '',
            [
                {
                    text: '取消',
                    onPress: value => console.log(value)
                },
                {
                    text: '确认',
                    onPress: value => console.log(value)
                },
            ], 'default', '', ['输入还款金额'])
    };
    // 确认还款
    confirmRepay = () => {
        this.setState({isControlBarTopping: false});
        // Modal.alert('提示', '该合同正在配账中，避免重复还款，请5-10分钟后再试')
    };
    // 事件处理器
    eventHandle = (type: string) => {
        if (this.state.showRedPacketPanel) {
            // 展示红包的情况下
            this.setState({callbackType: type || ''});
            this.toggleRedPacketPanel();
        } else {
            // 没有展示红包的情况下
            const self: any = this;
            typeof self[type] === 'function' && self[type]()
        }
    };
    // 弹层消失动画回调
    animateCallback = () => {
        const type = this.state.callbackType;
        const self: any = this;
        typeof self[type] === 'function' ? self[type]() : this.setState({isControlBarTopping: false})
    };
    render () {
        return (
            <div>
                <Tips iconImg={tipsIcon}>温馨提示：不同类型合同根据系统分类分开哦!</Tips>
                <MainPanel
                    date={'2018-09-06'}
                    amount={4200.00}
                    overdue={true} />
                <Tab select={this.selectTab}
                     list={this.state.tabList}
                     currentIndex={this.state.currentTabIndex} />
                {this.state.currentTabIndex === 0 ?
                    <Empty/> :
                    <section>
                        <ContractList
                            hasRedPacket={this.state.showRedPacketBar}
                            select={this.selectContract}
                            currentIndex={this.state.currentContractIndex} />
                        <RedPacketBar
                            amount={this.state.redPacketAmount}
                            visible={this.state.showRedPacketBar}
                            click={this.toggleRedPacketPanel} />
                        <ControlBar
                            topping={this.state.isControlBarTopping}
                            edit={() => this.eventHandle('editAmount')}
                            confirm={() => this.eventHandle('confirmRepay')} />
                        {/*<RepayConfirm showRepayConfirm={true} closeRepayConfirm={()=>{console.log('closeRepayConfirm')}} channelName={'京东支付'} discountAmounts={20} handleConfirm={()=>{console.log('handleConfirm')}} needToPayAmounts={1000} readProtocol={()=>{console.log('readProtocol')}} repayAmounts={1020} showProtocol={true} showChannel={true} changeChannel={()=>{console.log('changeChannel')}}/>*/}
                        <RedPacketPanel
                            amount={this.state.redPacketAmount}
                            select={this.selectRedPacket}
                            selectedList={this.state.selectedRedPackets}
                            list={this.state.redPacketList}
                            visible={this.state.showRedPacketPanel}
                            animateCallback={this.animateCallback}
                            onClose={() => this.eventHandle('closePanel')} />
                    </section>
                }
            </div>
        );
    }
}

export default Home;
