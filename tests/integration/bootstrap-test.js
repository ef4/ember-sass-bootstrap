import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

/* global setInterval, clearInterval */

moduleForComponent('Integration | Bootstrap', {
  integration: true
});

test('bootstrap uses customized sass variables', function(assert) {

  this.render(hbs`
    <div class="text-primary">Hello World</div>
  `);

  assert.equal(this.$('.text-primary').css('color'), 'rgb(255, 17, 119)');
});

test('glyphicons are available', function(assert) {
  assert.expect(1);
  this.render(hbs`
    <div style="font-size: 40px">
      <span class="glyphicon glyphicon-star"></span>
    </div>
  `);
  return new Ember.RSVP.Promise((resolve, reject) => {
    let start = Date.now();
    let interval = setInterval(() => {
      if (this.$('span').width() >=40) {
        clearInterval(interval);
        assert.ok(true);
        resolve();
        return;
      }
      if (Date.now() - start > 500) {
        clearInterval(interval);
        reject(new Error('Never saw glyphicon font become available'));
      }
    }, 10);
  });

});

test('only our desired plugins are present', function(assert) {
  assert.ok(!Ember.$.fn.scrollspy, "should not have un-selected plugins present");
  assert.ok(Ember.$.fn.collapse, "should have selected plugins present");
});
