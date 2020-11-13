const menuList = [
  {
    title: 'Home', // Title
    key: '/home', // path
    icon: 'home', // Icon name
    isPublic: true
  },
  {
    title: 'Product',
    key: '/products',
    icon: 'appstore',
    children: [ // SubMenu
      {
        title: 'Category',
        key: '/category',
        icon: 'bars'
      },
      {
        title: 'Product Manage',
        key: '/product',
        icon: 'tool'
      },
    ]
  },
  {
    title: 'User Manage',
    key: '/user',
    icon: 'user'
  },
  {
    title: 'Role Manage',
    key: '/role',
    icon: 'safety',
  },
  {
    title: 'Graph Diagram',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: 'Bar',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: 'Line',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: 'Pie',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  }
]

export default menuList
//默认暴露被引入的时候可以起任意的名字 分别暴露不行