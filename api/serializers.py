from django.contrib.auth.models import User

from rest_framework import serializers

from books.models import Book, Publisher, Author, Rating


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'groups',)


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('pk',
                  'title',
                  'description',
                  'isbn',
                  'authors',
                  'publisher',
                  'average_rating', )


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('pk', 'name',)


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('pk', 'name',)

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('pk', 'book', 'user', 'rating', )
