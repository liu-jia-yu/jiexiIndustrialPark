const position = [{
    name: '张三',
    duties: '保安',
    imgUrl: '/src/assets/perpo.png'
  },
  {
    name: '李四',
    duties: '保镖',
    imgUrl: '/src/assets/perpo.png'
  },
  {
    name: '李四',
    duties: '保镖',
    imgUrl: '/src/assets/perpo.png'
  },
  {
    name: '李四',
    duties: '保镖',
    imgUrl: '/src/assets/perpo.png'
  },
  {
    name: '李四',
    duties: '保镖',
    imgUrl: '/src/assets/perpo.png'
  },

]
const organization = [{
    number: '6',
    imgUrl: '/src/assets/perpo.png'
  },
  {
    number: '16',
    imgUrl: '/src/assets/perpo.png'
  }
]
const news = [{
    text: '研究部署学习宣传贯彻党的二十大精神',
    time: '2023.10.0'
  },
  {
    text: '研究部署学习宣传贯彻党的二十大精神',
    time: '2023.11.0'
  }, {
    text: '研究部署学习宣传贯彻党的二十大精神',
    time: '2023.12.0'
  }
]
const newone = [{
    text: '省级荣誉！双溪口乡周扎村成功入选2022年浙江省乡村振兴示范村创建名单',
    time: '2023.12.02',
  },
  {
    text: '争当“排头兵” 建功共富路丨双溪口乡青年干部热议县干部大会讲话精神',
    time: '2023.10.01'
  }
]
const tableData1 = [{
    col1: '周*敏',
    col2: '志愿活动',
    col3: '2022.05.20',
    col4: '+200',
  },
  {
    col1: '王*思',
    col2: '垃圾分类',
    col3: '2022.05.20',
    col4: '+200',
  },
  {
    col1: '王*子',
    col2: '垃圾分类',
    col3: '2022.05.20',
    col4: '+200',
  }
]
const tableData2 = [{
    col1: '周*敏',
    col2: '上周村村口垃圾桶周边顽固污渍清理',
    col3: '2022.05.20',
  },
  {
    col1: '王*思',
    col2: '里东村生活排污井堵塞疏通',
    col3: '2022.05.20',
  },
  {
    col1: '李*燕',
    col2: '里东村生活排污井堵塞疏通',
    col3: '2022.05.20',
  }
]
const tableData3 = [{
    col1: '周*国',
    col2: '家中电表断电异常告警',
    col3: '2022.05.20',
    col4: '未处理'
  },
  {
    col1: '王*兵',
    col2: '手环异常告警',
    col3: '2022.05.20',
    col4: '未处理'
  },
  {
    col1: '周*友',
    col2: '手环异常告警',
    col3: '2022.05.20',
    col4: '已处理'
  }
]
const tableData4 = [{
    col1: '周*友',
    col2: '残障人士',
    col3: '关怀礼包一份',
    col4: '2022.05.20'
  },
  {
    col1: '李*玉',
    col2: '低保户',
    col3: '1000元关爱基金',
    col4: '2022.05.20'
  },
  {
    col1: '李*玉',
    col2: '残障人士',
    col3: '关怀礼包一份',
    col4: '2022.05.20'
  },
  {
    col1: '李*玉',
    col2: '低保户',
    col3: '1000元关爱基金',
    col4: '2022.05.20'
  }
]
const integral = [{
    name: '周*敏',
    num: '2600',
  },
  {
    name: '王*思',
    num: '1899',
  },
  {
    name: '李*燕',
    num: '1400',
  }
]
const neighborhood = [{
    types: '低保户',
    num: '16',
    imgUrl: '/src/assets/icons/Subsistence allowance.png'
  },
  {
    types: '残障人士',
    num: '19',
    imgUrl: '/src/assets/icons/deformed man.png'
  },
  {
    types: '留守儿童',
    num: '86',
    imgUrl: '/src/assets/icons/baby.png'
  },
  {
    types: '孤寡老人',
    num: '46',
    imgUrl: '/src/assets/icons/the old.png'
  }
]
const VillageAssets = [{
    num: '1121',
    type: '宅基地'
  },
  {
    num: '11306',
    type: '集体用地'
  },
  {
    num: '1800',
    type: '园地'
  },
  {
    num: '35086',
    type: '林地'
  }
]
const Villageass = [{
    num: '11',
    type: '公共道路'
  },
  {
    num: '0',
    type: '国道'
  },
  {
    num: '0',
    type: '省道'
  },
  {
    num: '1',
    type: '县道'
  },
  {
    num: '26',
    type: '乡道'
  }
]

const VillageAsset = [{
    num: '8753',
    type: '农田数量'
  },
  {
    num: '286',
    type: '水田面积'
  },
  {
    num: '5867',
    type: '旱地面积'
  },
  {
    num: '-',
    type: '水系'
  }
]

function refresh() {
  return ''
}
export {
  position,
  organization,
  news,
  newone,
  tableData1,
  tableData2,
  tableData3,
  tableData4,
  integral,
  neighborhood,
  VillageAssets,
  VillageAsset,
  Villageass,
  refresh
}