import // ColorPicker
'element-ui'

export default {
  // 随机图标
  // http://ui.5ug.com/metronic_v5.5.5/theme/default/dist/default/components/icons/flaticon.html
  icon () {
    var iconList = [
      'flaticon-puzzle',
      'flaticon-menu-button',
      'flaticon-interface-2',
      'flaticon-layers',
      'flaticon-apps',
      'flaticon-user-settings',
      'flaticon-squares',
      'flaticon-youtube',
      'flaticon-cogwheel',
      'flaticon-responsive',
      'flaticon-rocket',
      'flaticon-event-calendar-symbol',
      'flaticon-technology',
      'flaticon-alert-2',
      'flaticon-user-add',
      'flaticon-placeholder-3',
      'flaticon-calendar-1',
      'flaticon-bag',
      'flaticon-profile',
      'flaticon-users',
      'flaticon-time-3',
      'flaticon-profile-1',
      'flaticon-multimedia-4',
      'flaticon-photo-camera',
      'flaticon-interface-4',
      'flaticon-interface-7',
      'flaticon-app',
      'flaticon-computer',
      'flaticon-add-circular-button',
      'flaticon-coins'
    ]
    var index = parseInt(Math.random() * (29 + 1), 10)
    return iconList[index]
  },
  // 随机颜色
  color () {
    var colorList = [{
        color: '#e95a40',
        sizeColor: '#ffffff'
      },
      {
        color: '#5867dd',
        sizeColor: '#ffffff'
      },
      {
        color: '#575962',
        sizeColor: '#ffffff'
      },
      {
        color: '#34bfa3',
        sizeColor: '#ffffff'
      },
      {
        color: '#ffb822',
        sizeColor: '#ffffff'
      },
      {
        color: '#36a3f7',
        sizeColor: '#ffffff'
      },
      {
        color: '#9816f4',
        sizeColor: '#ffffff'
      },
      {
        color: '#00c5dc',
        sizeColor: '#ffffff'
      },
      {
        color: '#ffffff',
        sizeColor: '#575962'
      },
      {
        color: '#f4516c',
        sizeColor: '#ffffff'
      }
    ]
    var index = parseInt(Math.random() * (9 + 1), 10)
    return colorList[index]
  }
}
