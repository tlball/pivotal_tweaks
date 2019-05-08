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
    var _this = this;
    if ($(_this).find('section.controls .branch_suggestion').length === 0) {
      id = $(_this).find('input.id')[0].value;
      ticket_title = $(_this).find('[name="story[name]"]')[0].innerHTML;
      slug = slugify(id + "-" + ticket_title);
      $.get(chrome.extension.getURL('/branch_name_template.html'), function(data) {
        $(_this).find('div.actions').append(data);
        var suggestion_btn = $(_this).find('.branch_suggestion_btn.clipboard_button');
        suggestion_btn.attr('data-clipboard-text', slug);
        var suggestion_btn_text = $(_this).find('.branch_suggestion_btn.text_value');
        suggestion_btn_text.attr('data-clipboard-text', slug);
        suggestion_btn_text.attr('value', slug);
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
  }, 500);
});
