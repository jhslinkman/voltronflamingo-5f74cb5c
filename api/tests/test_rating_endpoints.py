# encoding: utf-8
from __future__ import unicode_literals

import logging
import random

from django.contrib.auth.models import User
from django.core.urlresolvers import reverse

from rest_framework.test import APITestCase

from books.models import Book, Author, Publisher


logger = logging.getLogger(__name__)


class TestBookEndpoints(APITestCase):
    def setUp(self):
        self.author = Author.objects.create(name='Såm Lake')
        self.publisher = Publisher.objects.create(name='Fantastic Flight')
        self.book = Book.objects.create(title='Heraldic Wîng',
                                        isbn='1234567890123',
                                        publisher=self.publisher)
        self.book.authors.add(self.author)

        self.user = User.objects.create_user(username='A reader',
                                             email='hi@example.com',
                                             password='h0wdy**')

        self.list_url = reverse('rating-list')

    def test_post_rating(self):
        """POST /api/ratings/ should create a rating"""

        rating_data = {
            'user': self.user.pk,
            'book': self.book.pk,
            'rating': random.randint(1, 5)
        }

        self.client.post(self.list_url, data=rating_data)

        self.book.refresh_from_db()

        assert self.book.ratings.count() == 1
        self.assertAlmostEqual(self.book.average_rating, rating_data['rating'])
