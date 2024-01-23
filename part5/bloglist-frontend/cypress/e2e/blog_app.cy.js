describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Harris Kr',
      username: 'harriskr',
      password: 'harriskr'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    const root = {
      name: 'superuser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, root)
    cy.visit('')
  })

  describe('5.17', function () {
    it('Login form is shown', function () {
      cy.contains('Log in to application')
      cy.get('form')
      cy.contains('username')
      cy.get('#username').should('exist')
      cy.contains('password')
      cy.get('#password').should('exist')
      cy.contains('submit the form').should('exist')
    })
  })

  describe('5.18', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('harriskr')
      cy.get('#password').type('harriskr')
      cy.get('#login-button').click()
      cy.contains('Harris Kr logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('harriskr')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Harris Kr logged in')
    })
  })

  describe('5.19 - 5.22', function () {
    beforeEach(function () {
      cy.login({ username: 'harriskr', password: 'harriskr' })
    })

    it('5.19 - A blog can be created', function () {
      cy.createBlog({
        title: 'title example',
        author: 'author example',
        url: 'url example'
      })
      cy.contains('title example')
      cy.contains('author example')
      cy.contains('view details').click()
      cy.contains('url example')
      cy.contains('remove')
    })

    it('5.20 - User can like a blog', function () {
      cy.createBlog({
        title: 'title example',
        author: 'author example',
        url: 'url example'
      })
      cy.contains('view details').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('5.21 - delete a blog', function () {
      cy.createBlog({
        title: 'title example',
        author: 'author example',
        url: 'url example'
      })
      cy.contains('view details').click()
      cy.contains('remove').click()
      cy.get('html')
        .should('not.contain', 'title example')
        .and('not.contain', 'author example')
        .and('not.contain', 'url example')
    })

    it('5.22 - Only the creator can see the delete button of a blog', function () {
      // making blog as harriskr
      cy.createBlog({
        title: 'example harris',
        author: 'author harris',
        url: 'url example'
      })
      cy.contains('logout').click()
      cy.login({ username: 'root', password: 'sekret' })

      // making blog as root
      cy.createBlog({
        title: 'super example',
        author: 'author super',
        url: 'url example'
      })

      cy.contains('example harris').contains('view details').click()
      cy.contains('super example').contains('view details').click()

      // checking the blog can not be deleted by root because it was created
      // from harriskr
      cy.contains('example harris')
        .parent()
        .find('#remove-btn')
        .should('have.css', 'display', 'none')

      // checking that i can delete the blog created by root (logged in as root)
      cy.contains('super example')
        .parent()
        .find('#remove-btn')
        .should('not.have.css', 'display', 'none')
    })
  })
  describe('5.23', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({
        title: 'least liked',
        author: 'idkman',
        url: 'url example'
      })
      cy.createBlog({
        title: 'most liked',
        author: 'author super',
        url: 'url example'
      })
    })

    it('blogs in discending order according to number of likes', function () {
      cy.contains('most liked').contains('view details').click()
      for (let i = 0; i < 3; i++) {
        cy.contains('most liked').parent().find('.likebtn').click()
        cy.wait(1000)
      }

      cy.get('.blog').eq(0).should('contain', 'most liked')
      cy.get('.blog').eq(1).should('contain', 'least liked')

    })
  })
})