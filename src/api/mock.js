import Mock from 'mockjs';
import position from '@/api/mockServerData/position'
import index_entry from '@/api/mockServerData/index_entry'
import restaurants from '@/api/mockServerData/restaurants'
import goodlists from '@/api/mockServerData/goodlists'
import login from '@/api/mockServerData/users'
import orderlists from '@/api/mockServerData/orderlists'


//配置请求延时
Mock.setup({
    timeout:1000
})

Mock.mock('/api/position','get',position)
Mock.mock('/api/index_entry','get',index_entry)
Mock.mock('/api/restaurants','get',restaurants)
Mock.mock(RegExp('/api/goodlists.*'),'get',goodlists.showgoodlists)
Mock.mock('/api/users','post',login)
Mock.mock(RegExp('/api/orderlists.*'),'get',orderlists)




export default Mock

