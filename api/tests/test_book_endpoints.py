# encoding: utf-8
from __future__ import unicode_literals

import logging
import random

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.test import APITestCase
from rest_framework import status

from books.models import Book, Author, Publisher, Rating


logger = logging.getLogger(__name__)


class TestBookEndpoints(APITestCase):
    def setUp(self):
        self.author = Author.objects.create(name='Såm Lake')
        self.publisher = Publisher.objects.create(name='Fantastic Flight')
        self.book = Book.objects.create(title='Heraldic Wîng', isbn='1234567890123', publisher=self.publisher)
        self.book.authors.add(self.author)

        self.full_data = {
            'title': self.book.title,
            'isbn': self.book.isbn,
            'description': 'High fantasy',
            'authors': [self.author.pk],
            'publisher': self.publisher.pk,
        }

        self.detail_url = reverse('book-detail', kwargs={'pk': self.book.pk})
        self.list_url = reverse('book-list')

    def test_get_book(self):
        """GET /api/book/\d+/ should return the book"""
        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['pk'] == self.book.pk
        assert response.data['title'] == self.book.title
        assert response.data['publisher'] == self.book.publisher.pk
        assert response.data['authors'] == [a.pk for a in self.book.authors.all()]
        assert response.data['average_rating'] == None

    def test_get_book_with_ratings(self):
        """GET /api/book/\d+/ should return the average rating of the book"""
        user = User.objects.create_user(username="A reader",
                                        email="hi@example.com",
                                        password="h0wdy**")
        rating = random.randint(1, 5)
        Rating.objects.create(rating=rating,
                              book=self.book,
                              user=user)
        response = self.client.get(self.detail_url)
        self.assertAlmostEqual(response.data['average_rating'], rating)

    def test_patch_book(self):
        """PATCH /api/book/\d+/ should update the book"""
        expected_description = """In a hole there lived a creepy, grey alien named Sonya Grey. Not a backward, hot,
        tall hole, filled with stamps and a greasy smell, nor yet a violent, charming, pretty hole with nothing in it
        to sit down on or to eat: it was an alien-hole, and that means shelter.
        """.strip()
        response = self.client.patch(self.detail_url, data={'description': expected_description})
        assert response.status_code == status.HTTP_200_OK
        assert response.data['description'] == expected_description

    def test_put_book(self):
        """PUT /api/book/\d+/ should update the book"""
        expected_description = "Totally informative description"
        self.full_data['description'] = expected_description
        response = self.client.put(self.detail_url, data=self.full_data)
        assert response.data['description'] == expected_description
        assert Book.objects.first().description == expected_description

    def test_delete_book(self):
        """DELETE /api/book/\d+/ should delete the book"""
        expected_books = Book.objects.count() - 1
        response = self.client.delete(self.detail_url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Book.objects.count() == expected_books

    def test_post_book(self):
        """POST /api/book/ should create a book"""
        expected_books = Book.objects.count() + 1
        response = self.client.post(self.list_url, data=self.full_data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Book.objects.count() == expected_books

    def test_list_book(self):
        """GET /api/book/ should list all books"""
        num_created = random.randint(5, 10)
        expected_books = Book.objects.count() + num_created
        for i in range(num_created):
            Book.objects.create(
                title='The Neverending Series {}'.format(i),
                isbn='111111111111{}'.format(i),
                publisher=self.publisher
            )

        response = self.client.get(self.list_url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == expected_books
        for book, response_item in zip(Book.objects.all(), response.data):
            assert response_item['pk'] == book.pk

    def test_list_book_with_ratings(self):
        """GET /api/book/ should return the average rating for each book"""
        user = User.objects.create_user(username="A reader",
                                        email="hi@example.com",
                                        password="h0wdy**")
        rating = random.randint(1, 5)
        Rating.objects.create(rating=rating,
                              book=self.book,
                              user=user)

        response = self.client.get(self.list_url)

        self.assertAlmostEqual(response.data[0]["average_rating"], rating)
