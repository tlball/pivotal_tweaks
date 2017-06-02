function slugify(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
}

function displayBranchNameSuggestions() {
  details = $('.story .edit.details');

  details.each(function () {
    id = $(_this).find('input.id')[0].value;
    ticket_title = $(_this).find('[name="story[name]"]')[0].innerHTML;
    slug = slugify(id + "-" + ticket_title);
    var _this = this;
    if ($(_this).find('section.controls .branch_suggestion').length === 0) {
      $.get(chrome.extension.getURL('/branch_name_template.html'), function(data) {
        $(_this).find('section.controls').append(data);
        var suggestion_btn = $(_this).find('.branch_suggestion_btn.clipboard_button');
        suggestion_btn.attr('data-clipboard-text', slug);
        $(_this).find('.branch_suggestion_btn.clipboard_button').append(slug);
      });
    }
  });
}

$('body').click(function (event) {
  setTimeout(function () {
    var expanded_stories = $('.story .edit.details');
    if(expanded_stories.length > 0){
      displayBranchNameSuggestions();
    }
  }, 1000);
});
