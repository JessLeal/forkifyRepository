import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _currentPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const gotoPage = Number(btn.dataset.goto);

      handler(gotoPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, and there are other page
    if (this._currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('right');
    }

    //Last page
    if (this._currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('left');
    }

    //Other page
    if (this._currentPage < numPages) {
      return [
        this._generateMarkupBtn('right'),
        this._generateMarkupBtn('left'),
      ].join('');
    }

    //Page 1 and there are no other page
    return ``;
  }

  _generateMarkupBtn(dir) {
    if (dir === 'right') {
      return `
        <button data-goto="${
          this._currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    if (dir === 'left') {
      return `
        <button data-goto = "${
          this._currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._currentPage - 1}</span>
        </button>`;
    }
  }
}

export default new PaginationView();
