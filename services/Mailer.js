// this service start with capital 'M' because this will export a class.
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
  constructor({ subject, recipients }, content){
    super();
    // 這裡寫入 mailer 這個物件該有的 property
    this.sgApi = sendgrid(keys.sendGridKey); // return an api object
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    // 自定義一個函數，把 recipients 利用 sendgrid 的方法處理過
    this.recipients = this.formatAddresses(recipients);
    // 這是一個繼承自 sendgrid.mail.Mail 物件的方法，可以將物件加入 content
    this.addContent(this.body);
    // 這裡自定義一個追蹤點擊的方法
    this.addClickTracking();
    // 定義一個加入回應的方法
    this.addRecipients();
  }

  formatAddresses(recipients){
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  };

  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  };

  addRecipients(){
    const personalize = new helper.Personalization();
    // 這裡指的是經過 formatAddress() 的每個 email，加入剛剛建立的 personalize 物件
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // 繼承自 sendgrid.mail.Mail 的方法，把剛剛的 personalize 物件加入
    this.addPersonalization(personalize);
  };

  async send(){
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    });

    const response = await this.sgApi.API(request);
    return response;
  };
};

module.exports = Mailer;
