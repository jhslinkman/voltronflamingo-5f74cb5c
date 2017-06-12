# encoding: utf-8
from __future__ import unicode_literals

from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.ManyToManyField('Author', related_name='books')
    description = models.TextField(blank=True)
    publisher = models.ForeignKey('Publisher')
    isbn = models.CharField(max_length=255)

    class Meta:
        ordering = ('title', )

    def __unicode__(self):
        return self.title

    @property
    def average_rating(self):
        """Return the average rating for this book."""
        num_ratings = self.ratings.count()
        if num_ratings == 0:
            return None
        rating_sum = sum(r.rating for r in self.ratings.all())
        return float(rating_sum) / num_ratings


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name


class Rating(models.Model):
    rating = models.IntegerField()
    user = models.ForeignKey('auth.User', related_name='ratings')
    book = models.ForeignKey('Book', related_name='ratings')

    def __unicode__(self):
        return "{} - {} by {}".format(self.rating, self.book.title, self.user.username)
