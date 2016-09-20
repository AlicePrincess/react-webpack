import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import _ from 'underscore'
import {
    Table,
    Icon,
    Button,
    DatePicker,
    Modal,
    Tabs,
    Popconfirm,
    message
} from 'antd';
import styles from "./MyTuso.less"
import moment from 'moment'
import TusoForm from '../../components/contentManage/TusoForm'
import ViewTuso from '../../components/contentManage/ViewTuso'
import {fetchUserTuso,deleteTuso,createTuso} from '../../actions/tuso'
import {uploadImageList} from '../../actions/image.js'
import FilterKeyword from '../../components/Common/FilterKeyword'
import {fetchAllAccount} from '../../actions/account'
import {followUser} from '../../actions/puppet'
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const defaultStartDate = new Date()
 defaultStartDate.setFullYear(1970,1,1)
const defaultEndDate = new Date()
  defaultEndDate.setFullYear(4000,1,1)
class MyComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedRowKeys: [], // 这里配置默认勾选列
            data:[],
            dateformat: [], //搜索mormat后的数据
            searchOleData:[],
            searchValue: "",
            addVisible: false, //新增随记弹出框状态
            viewVisible: false, //查看随记弹出框状态
            viewStatus: false, //查看的随记是否需要翻转
            essayist: "", //数据需要改动，模态框的动态数据
            upLoadTusoList:[],//我的图说已上传的图片的列表
            startValue:null,//日期开始
            endValue:null,//日期结束
            searchToday:false,//查询今天数据
            pageSize:10,
            current:1,
            allCount:this.props.allCount
        }

    }
    componentDidMount(){
      // offsetHead, offsetTail, startTime, endTime
    this.props.fetchAllAccount(this.props.user.get('token'),(this.state.current-1)*this.state.pageSize, this.state.current*this.state.pageSize,moment(defaultStartDate).format("YYYY-MM-DDTHH:mm:ssZ"),moment(defaultEndDate).format("YYYY-MM-DDTHH:mm:ssZ"));
    }
    componentWillReceiveProps(nextProps){
      //配个ant勾选所以得key字段
     nextProps.data.map((items, index) => {
       items.key=index;
     })
     let newData=[]
     if(this.state.startValue){
       nextProps.data.map((items, index) => {
         if(Date.parse(this.state.startValue) < Date.parse(items.user_create_at) && Date.parse(items.user_create_at) < Date.parse(this.state.endValue)){
              newData.push(items);
         }
       })
     }else{
       newData=nextProps.data.toJS()
     }
    this.setState({
      data:newData,
      dateformat:newData,
      searchOleData:newData,
      allCount:nextProps.allCount,
      selectedRowKeys: [], loading: false
    })


    }
    /**
     * [batch delete]
     */
    start() {
       let selectKeyTemps=[];
        this.state.selectedRows.map((items, index) => {
          selectKeyTemps.push(items.uuid);
        })
        // this.props.deleteTuso(selectKeyTemps,this.props.user.get('token'));
    }
    /**
     * [onSelectChange 勾选行时触发]
     * @param  {[int]} selectedRowKeys [和data的key对应]
     * @param  {[object]} selectedRows    [key对应的行object]
     */
    onSelectChange(selectedRowKeys,selectedRows) {
        this.setState({selectedRowKeys,selectedRows});
    }
    /**
     * [onDateChange 日期选择完成]
     * @param  {[array]} value [根据日期的范围format数据]
     */
    onDateChange(value) {
          let dataTemp = [];
          if (value[0] == null && value[1] == null) {
                dataTemp = this.state.data;
                this.props.fetchAllAccount(this.props.user.get('token'),(this.state.current-1)*this.state.pageSize, this.state.current*this.state.pageSize,moment(defaultStartDate).format("YYYY-MM-DDTHH:mm:ssZ"),moment(defaultEndDate).format("YYYY-MM-DDTHH:mm:ssZ"));
                this.setState({startValue: null,endValue:null})
           } else {
              this.setState({startValue: value[0],endValue:value[1]})
                // this.state.data.map((items, index) => {
                //     if (Date.parse(value[0]) < Date.parse(items.timestamp) && Date.parse(items.timestamp) < Date.parse(value[1])) {
                //         dataTemp.push(items);
                //     }
                // })
                console.log(this.props.user.get('token'),(this.state.current-1)*this.state.pageSize, this.state.current*this.state.pageSize,moment(value[0]).format("YYYY-MM-DDTHH:mm:ssZ"),moment(value[1]).format("YYYY-MM-DDTHH:mm:ssZ"));
                  this.props.fetchAllAccount(this.props.user.get('token'),(this.state.current-1)*this.state.pageSize, this.state.current*this.state.pageSize,moment(value[0]).format("YYYY-MM-DDTHH:mm:ssZ"),moment(value[1]).format("YYYY-MM-DDTHH:mm:ssZ"));

          }

        this.setState({dateformat: dataTemp,searchOleData:dataTemp,searchToday:false})

    }
    /**
     * 弹出层以及预览内容
     */
    //显示新增随记弹出框
    showModal(data) {
        this.props.push("/contentManage/tuso/add");
    }
    //新增随记弹出框确定点击事件
    handleOk() {
        if(this.state.upLoadTusoList.length!=0){//检测是否有图片，至少一张才可以保存
            this.setState({addVisible: false});
            uploadImageList(this.state.upLoadTusoList,this.props.user.toJS().token).then((uuidList)=>{
                let uuidArr = [];
                uuidList.map((item)=>{
                    uuidArr.push(item.uuid)
                })
                this.props.createTuso(uuidArr,this.props.user.toJS().token)
            });
        }else{
            alert('请上传至少一张图片!');
        }
    }
    handleCancel(e) {
        this.setState({addVisible: false});
    }
    //显示查看随记弹出框
    showViewModal(data, modalView) {
        this.setState({
            viewVisible: true,
            viewStatus: data,
            "essayist":{
              "modalViewImages":modalView.images,
              "user":modalView.user,
              "starred_count":modalView.starred_count,
              "timestamp":modalView.timestamp
            }
        });
    }
    //查看随记弹出框确定点击事件
    handleViewOk() {
        this.setState({viewVisible: false});
    }
    handleViewCancel(e) {
        this.setState({viewVisible: false});
    }
    handleDeleteConfirm(recod) {
      let selectKeyTemps=[];
      selectKeyTemps.push(recod.id);
      // authToken, pup_ids, usr_ids
      followUser(this.props.user.get('token'),[parseInt(localStorage.getItem('puppetId'))],selectKeyTemps);
      // this.props.deleteTuso(selectKeyTemps,this.props.user.get('token'));
      message.success('关注成功');
    }
    handleDeleteCancel() {
        // message.error('点击了取消');
    }
    // 查询匹配今天日期
  handleSerchToday() {
    let todayMorning = new Date();
    let todayEvening = new Date();
    if (this.state.searchToday) {
        todayMorning = null;
        todayEvening = null;
    } else {
        todayMorning.setHours(0, 0, 0);
        todayEvening.setHours(23, 59, 59);
    }
    this.onDateChange([todayMorning, todayEvening])
    this.setState({
        searchToday: !this.state.searchToday
    })
}
// changeUpLoadTusoList(arr) { //更新上传的图片列表
//     this.setState({upLoadTusoList: arr})
// }
/**
 * [showConfirm 弹出批量删除删除确认框] */
showConfirm() {
    let that = this;
    confirm({
        title: '您是否要删除这些选中的图说',
        content: '',
        onOk() {
            // console.log(that);
            that.start();
        },
        onCancel() {}
    });
}
handleFilter(data,searchValue){
if(searchValue!=""){
  this.setState({dateformat:data,searchValue:searchValue})
}else{
  this.setState({dateformat:this.state.searchOleData,searchValue:""})
}


}
handleChangePage(data) {
    // this.props.fetchAllTuso((data.current - 1) * this.state.pageSize, data.current * this.state.pageSize);
    this.setState({current: data.current})
    if(this.state.startValue&&this.state.endValue&&this.state.endValue!=null&&this.state.startValue!=null){
      this.props.fetchAllAccount(this.props.user.get('token'),(data.current-1)*this.state.pageSize, data.current*this.state.pageSize,moment(this.state.startValue).format("YYYY-MM-DDTHH:mm:ssZ"),moment(this.state.endValue).format("YYYY-MM-DDTHH:mm:ssZ"));

    }else{
      this.props.fetchAllAccount(this.props.user.get('token'),(data.current-1)*this.state.pageSize, data.current*this.state.pageSize,moment(defaultStartDate).format("YYYY-MM-DDTHH:mm:ssZ"),moment(defaultEndDate).format("YYYY-MM-DDTHH:mm:ssZ"));
    }
}
handleShowSizeChange(current, pageSize){
  this.setState({pageSize:pageSize})
}
    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,

            onChange: this.onSelectChange.bind(this)
        };
        const hasSelected = selectedRowKeys.length > 0;
        // 发布时间  图说数量  操作（查看｜修改｜删除）
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'id',
                width: '8%',
                sorter: (a, b) => a.id - b.id

            },
            //  {
            //     title: '头像',
            //     dataIndex: 'images',
            //     width: '15%',
            //     render: (text,record) => {
            //         let img = new Image();
            //         let imgWidth;
            //         img.src = text[0].display_image.display_url;
            //         if (img.width <= img.height) {
            //             imgWidth = {
            //                 width: "100%"
            //             }
            //         } else {
            //             imgWidth = {
            //                 height: "100%"
            //             }
            //         }
            //         return <a onClick={this.showViewModal.bind(this, true, record)} className="coverBox"><img src={text[0].display_image.display_url} style={imgWidth}/></a>
            //     }
            // },
            {
                title: '用户昵称',
                dataIndex: 'nickname',
                width: '30%',
                render: (text,record) =>{
                    if (text.indexOf(this.state.searchValue) !=-1 && this.state.searchValue != "") {
                          return <span>
                            {text.split(this.state.searchValue)[0]}
                            <span style={{
                                color: "red"
                            }}>{this.state.searchValue}</span>
                            {text.split(this.state.searchValue)[1]}</span>;
                    }
                    return <span>{text}</span>;
                }
            }, {
                title: ' 创建时间',
                dataIndex: 'user_create_at',
                width: '15%',
                sorter: (a, b) => (Date.parse(a.user_create_at) - Date.parse(b.user_create_at)) / 3600 / 1000,
                render: (text) =>{
                    return <span>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</span>;
                }
            }, {
                title: '关注数',
                dataIndex: 'followers',
                width: '10%',
                sorter: (a, b) => a.photoNum - b.photoNum,
                render: (text,record) =>{

                    return <span>{text}</span>;
                }
            },{
                title: '粉丝数',
                dataIndex: 'followees',
                width: '10%',
                sorter: (a, b) => a.likeNum - b.likeNum,
                render: (text,record) =>{

                    return <span>{text}</span>;
                }
            },{
                title: '好友数',
                dataIndex: 'friends',
                width: '10%',
                sorter: (a, b) => a.likeNum - b.likeNum,
                render: (text,record) =>{
                    return <span>{text}</span>;
                }
            }, {
                title: '操作',
                width: '12%',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="确定要关注此用户吗？" onConfirm={this.handleDeleteConfirm.bind(this,record)} onCancel={this.handleDeleteCancel.bind(this)}>
                            <a href="#">关注</a>
                        </Popconfirm>

                    </span>
                )
            }
        ];

        return (
            <div className={styles.root}>
                <div className="ant-layout-main">
                    <div className="tab">
                        <Tabs type="card">
                            <TabPane tab={this.props.selectMenuName} key="1">
                             <span className="searchBox">
                              <FilterKeyword handleFilter={this.handleFilter.bind(this)} data={this.state.searchOleData} field={["nickname"]}></FilterKeyword>
</span>
                                <div className="inputBox">
                                    <RangePicker value={[this.state.startValue,this.state.endValue]} showTime format="yyyy/MM/dd HH:mm:ss" onChange={this.onDateChange.bind(this)}/>
                                    <span className="searchBox">
                                    <Button type="primary" onClick={this.handleSerchToday.bind(this)}>{this.state.searchToday?"查询所有":"查询今天"}</Button></span>
                            </div>
                                <div className="deleteBut">

                                  <Popconfirm title="您是否要批量关注选中用户？" onConfirm={this.start.bind(this)} onCancel={this.handleDeleteCancel.bind(this)}>
                                    <Button icon="heart-o" disabled={!hasSelected} loading={loading} type="primary">批量关注</Button>

                                  </Popconfirm>
                                    {/* <span className="addTuso">
                                      <Popconfirm title="您是否要取消对选中用户的关注？" onConfirm={this.start.bind(this)} onCancel={this.handleDeleteCancel.bind(this)}>
                                        <Button icon="cross" disabled={!hasSelected} loading={loading} type="primary">批量取消关注</Button>

                                      </Popconfirm>
                                    </span> */}

                                </div>
                                <div className="ant-layout-container">
                                  <Table rowSelection={rowSelection} onChange={this.handleChangePage.bind(this)}
                                    columns={columns}
                                    dataSource={this.state.dateformat}
                                    pagination={{
                                      pageSize: this.state.pageSize,
                                      total:this.state.allCount,
                                      current:this.state.current,
                                      showSizeChanger:true,
                                      onShowSizeChange:this.handleShowSizeChange.bind(this),
                                      pageSizeOptions:["10","15","20","30","40","50"]
                                  }}/>
                                </div>
                            </TabPane>
                        </Tabs>
                        <Modal title="添加图说" wrapClassName="vertical-center-modal myTuso"
                            visible={this.state.addVisible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
                            {
                              // <TusoForm changeUpLoadTusoList={this.changeUpLoadTusoList.bind(this)} handleViewCancel={this.handleCancel.bind(this)}></TusoForm>
                            }
                        </Modal>
                        <Modal wrapClassName="vertical-center-modal viewEssay" visible={this.state.viewVisible} onOk={this.handleViewOk.bind(this)} footer={[]} onCancel={this.handleViewCancel.bind(this)}>
                            {
                              <ViewTuso {...this.props} viewStatus={this.state.viewStatus} essayist={this.state.essayist} handleViewCancel={this.handleViewCancel.bind(this)}></ViewTuso>
                            }
                        </Modal>
                    </div>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
          data:state.getIn(["account"]).get("all"),
          allCount:state.getIn(["account"]).get("allCount"),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserTuso: bindActionCreators(fetchUserTuso, dispatch),
        deleteTuso: bindActionCreators(deleteTuso, dispatch),
        createTuso: bindActionCreators(createTuso, dispatch),
        fetchAllAccount: bindActionCreators(fetchAllAccount, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
