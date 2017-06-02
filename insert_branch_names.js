function slugify(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
}

function displayBranchNameSuggestions() {
  details = $('.edit.details');

  details.each(function () {
    id = $(this).find('input.id')[0].value;
    ticket_title = $(this).find('[name="story[name]"]')[0].innerHTML;
    slug = slugify(id + "-" + ticket_title);
    if ($(this).find('section.controls .branch_suggestion').length === 0) {
      $(this).find('section.controls').append(
        '<div><button type="button" title="Copy branch name suggestion to clipboard" data-clipboard-text="' +
          slug +
          '" class="branch_suggestion clipboard_button hoverable left_endcap" tabindex="-1">' +
          slug +
          '</button></div>'
      );
    }
  });
}

displayBranchNameSuggestions();
