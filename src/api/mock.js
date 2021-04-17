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

Mock.mock('/api/posi',position)
Mock.mock('/api/index_entry',index_entry)
Mock.mock('/api/restaurants',restaurants)
Mock.mock('/api/goodlists',goodlists.showgoodlists)
Mock.mock('/api/users',login)
Mock.mock('/api/orderlists',orderlists)


export default Mock

