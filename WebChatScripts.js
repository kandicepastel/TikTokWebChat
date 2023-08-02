/*
  Uses: Run Javascript Browser Extension
*/

  $(document).ready(function() {

    let widthOfSide = 350;
    let heightOfSide = 250;
    var isScrolling = false;

    let cont = $('.tiktok-1c9cfuz-DivChatMessageList');
    cont.on('scroll', function() {
      // console.log('scrolling');
      if(!isScrolling) {
        runMe();
        setTimeout(function() {
          isScrolling = false;
          runMe();
        }, 250);
        isScrolling = true;
      }
    });
    let contHeight = cont.offsetHeight;


    function runMe() {
      var selectors = $('div[data-e2e="chat-message"]');
      selectors.each(function() {
        let item = $(this);
        let child = $(item.find('.tiktok-1kue6t3-DivComment'));
        let y = $(this).position().top;
        // console.log(item, y);
        if(y > heightOfSide) {
          child.css('width', '100%');
        } else {
          child.css('width', 'calc(100% - ' + widthOfSide + 'px)');
        }
      });
      selectors = $('div[data-e2e="social-message"]');
      selectors.each(function() {
        let item = $(this);
        let child = $(item.find('[data-e2e="social-message-text"]'));
        let y = $(this).position().top;
        // console.log(item, y);
        if(y > heightOfSide) {
          child.css('width', '100%');
        } else {
          child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
        }
      });


      selectors = $('.tiktok-1ofcoff-DivRoomMessage');
      selectors.each(function() {
         let item = $(this);
        let child = $(item.find('.tiktok-1bvufdu-DivContent'));
        let y = $(this).position().top;
        // console.log(item, y);
        if(y > heightOfSide) {
          child.attr('style', '');
        } else {
          child.css('width', 'calc(100% - ' + widthOfSide + 'px - 90px)');
        }
      });

      selectors = $('.tiktok-15hhtcj');
      selectors.each(function() {
        let item = $(this);
        let child = $(item.find('.tiktok-1kue6t3-DivComment'));
        let y = $(this).position().top;
        // console.log(item, y);
        if(y > heightOfSide) {
          child.css('width', '100%');
        } else {
          child.css('width', 'calc(100% - ' + widthOfSide + 'px)');
        }
      });

    
        $('.tiktok-rykcaj-DivChatRoomBody').scrollTop($('.tiktok-rykcaj-DivChatRoomBody').height());
      
    }



   








  });
