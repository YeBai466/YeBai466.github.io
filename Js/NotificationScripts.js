let notificationCountArray = [];

  function showNotification(title,description,icon = "🔔") {
    // 计算通知的垂直位置
    let tempCount = 0;
    while(notificationCountArray.includes(tempCount)){
        tempCount++;
    }
    const verticalPosition = tempCount * 100; // 每个通知占据100px的高度，包括边距

    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'ant-notification';
    notification.style.bottom = `${verticalPosition}px`;

    // 添加通知内容
    notification.innerHTML = `
      <div class="ant-notification-icon">` + icon + `</div>
      <div class="ant-notification-content">
        <div class="ant-notification-title">` + title + `</div>
        <div class="ant-notification-description">` + description + `</div>
      </div>
      <div class="ant-notification-close" onclick="closeNotification(this.parentElement)">×</div>
    `;

    // 添加到通知容器
    const notificationContainer = document.getElementById('notificationContainer');
    notificationContainer.appendChild(notification);

    // 延迟一点时间后添加'show'类，触发动画
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // 自动关闭通知
    setTimeout(() => {
      closeNotification(notification);
      notificationCountArray = notificationCountArray.filter(function(item) {
        return item !== tempCount
      });
    }, 5000);

    notificationCountArray.push(tempCount);
  }

  function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 500); // 等待动画完成后移除元素
  }