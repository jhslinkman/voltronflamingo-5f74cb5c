# encoding: utf-8
from __future__ import unicode_literals

import logging
import random

from django.core.urlresolvers import reverse

from rest_framework.test import APITestCase
from rest_framework import status

from books.models import Author


logger = logging.getLogger(__name__)


class TestAuthorEndpoints(APITestCase):
    def setUp(self):
        self.author = Author.objects.create(name='Såm Lake')

        self.full_data = {
            'name': self.author.name
        }

        self.detail_url = reverse('author-detail', kwargs={'pk': self.author.pk})
        self.list_url = reverse('author-list')

    def test_get_author(self):
        """GET /api/author/\d+/ should return the author"""
        response = self.client.get(self.detail_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['pk'] == self.author.pk
        assert response.data['name'] == self.author.name

    def test_patch_author(self):
        """PATCH /api/author/\d+/ should update the author"""
        expected_name = 'Story-bot'
        response = self.client.patch(self.detail_url, data={'name': expected_name})
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == expected_name

    def test_put_author(self):
        """PUT /api/author/\d+/ should update the author"""
        expected_name = 'Story-bot'
        self.full_data['name'] = expected_name
        response = self.client.put(self.detail_url, data=self.full_data)
        assert response.data['name'] == expected_name
        assert Author.objects.first().name == expected_name

    def test_delete_author(self):
        """DELETE /api/author/\d+/ should delete the author"""
        expected_authors = Author.objects.count() - 1
        response = self.client.delete(self.detail_url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Author.objects.count() == expected_authors

    def test_post_author(self):
        """POST /api/author/ should create a author"""
        expected_authors = Author.objects.count() + 1
        response = self.client.post(self.list_url, data=self.full_data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Author.objects.count() == expected_authors

    def test_list_author(self):
        """GET /api/author/ should list all authors"""
        num_created = random.randint(5, 10)
        expected_authors = Author.objects.count() + num_created
        for i in range(num_created):
            Author.objects.create(name='Story-bot {}'.format(i))

        response = self.client.get(self.list_url)

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == expected_authors
        for author, response_item in zip(Author.objects.all(), response.data):
            assert response_item['pk'] == author.pk
