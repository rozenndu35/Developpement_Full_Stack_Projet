package com.esiea.blogAPI.service;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.repository.AuthorRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthorServiceTest {

    @Mock
    private Article article1 = mock(Article.class);
    @Mock
    private Article article2 = mock(Article.class);
    @Mock
    private Article article3 = mock(Article.class);
    @Mock
    private Author author1 = mock(Author.class);
    @Mock
    private Author author2 = mock(Author.class);
    @Mock
    private Author author3 = mock(Author.class);

    @Mock
    private AuthorRepository authorRepository = mock(AuthorRepository.class);

    @InjectMocks
    private AuthorService authorService;

    private List<Article> articles1;
    private List<Article> articles2;

    @BeforeEach
    void setUp() throws Exception {
        articles1 = new ArrayList<>();
        articles1.add(article1);
        articles1.add(article2);

        articles2 = new ArrayList<>();
        articles2.add(article2);
        articles2.add(article3);
    }

    @Test
    void getAuthors() {
        List<Author> authors1 = new ArrayList<>();
        authors1.add(author1);
        authors1.add(author2);
        when(authorRepository.findAll()).thenReturn(authors1);
        when(author1.toString()).thenReturn("author1");
        when(author2.toString()).thenReturn("author2");
        Iterable<Author> result = authorService.getAuthors();
        Iterator<Author> resultIterator = result.iterator();
        Assertions.assertEquals( "author1" ,resultIterator.next().toString());
        Assertions.assertEquals( "author2" ,resultIterator.next().toString());
    }



    @Test
    void getAuthorGood() throws NotFoundException {
        Long id = Long.valueOf(1);
        List<Author> authors1 = new ArrayList<>();
        when(authorRepository.findById(id)).thenReturn(Optional.of(author1));
        when(author1.toString()).thenReturn("author1");
        Author result = authorService.getAuthor(id);
        Assertions.assertEquals( "author1" ,result.toString());
    }

    @Test
    void getAuthorWrong() throws NotFoundException {
        Long id = Long.valueOf(1);
        when(authorRepository.findById(id)).thenReturn(Optional.empty());
        Assertions.assertThrowsExactly(NotFoundException.class, () ->{authorService.getAuthor(id);});
    }

    @Test
    void saveGood() throws NotAllowedException {
        when(authorRepository.save(author1)).thenReturn(author2);
        // Le save rajoute un id, donc la catégorie retournée n'est pas la même que celle en entrée
        when(author2.toString()).thenReturn("author2");
        when(author1.getId()).thenReturn(null);
        Author result = authorService.save(author1);
        Assertions.assertEquals("author2", result.toString());
    }

    @Test
    void saveWrong(){
        when(author1.getId()).thenReturn(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotAllowedException.class, () ->{authorService.save(author1);});
    }

    @Test
    void createAuthorIfNotExist() throws NotAllowedException, NotFoundException {
        when(author1.getId()).thenReturn(null);
        when(authorService.save(author1)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");
        Author result = authorService.CreateAuthorIfNotExist(author1);
        Assertions.assertEquals("author2", result.toString());
    }

    @Test
    void createAuthorIfNotExistGetAuthor() throws NotAllowedException, NotFoundException {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author2.toString()).thenReturn("author2");
        when(author2.equalsOrNull(author1)).thenReturn(true);
        Author result = authorService.CreateAuthorIfNotExist(author1);
        assertEquals("author2", result.toString());
    }

    @Test
    void createAuthorIfNotExistGetCategoryWrong() throws NotAllowedException {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author2.equalsOrNull(author1)).thenReturn(false);
        assertThrowsExactly(NotFoundException.class,()  ->{authorService.CreateAuthorIfNotExist(author1);});
    }

    @Test
    void replaceGood() throws NotAllowedException, NotFoundException {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(authorRepository.save(author1)).thenReturn(author3);
        when(author3.toString()).thenReturn("author3");
        Author result = authorService.replace(author1);
        Assertions.assertEquals("author3", result.toString());
    }

    @Test
    void patchWithoutChangeByNull() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn(null);
        //when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn(null);
        //when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(null);
        //when(author2.getArticles()).thenReturn(authors1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }
    @Test
    void patchWithoutChangeBySameFirstname() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn("firstName");
        when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn(null);
        //when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(null);
        //when(author2.getArticles()).thenReturn(authors1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }
    @Test
    void patchWithoutChangeBySameLastname() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn(null);
        //when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn("lastname");
        when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(null);
        //when(author2.getArticles()).thenReturn(authors1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }

    @Test
    void patchWithoutChangeBySameCategories() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn(null);
        //when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn(null);
        //when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(articles1);
        when(author2.getArticles()).thenReturn(articles1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }

    @Test
    void patchChangeFirstName() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn("newFirstname");
        when(author2.getFirstName()).thenReturn("firstName");
        doNothing().when(author2).setFirstName("newFirstname");
        when(author1.getLastName()).thenReturn(null);
        //when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(null);
        //when(author2.getArticles()).thenReturn(authors1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }

    @Test
    void patchChangeLastname() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn(null);
        //when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn("newLastname");
        when(author2.getLastName()).thenReturn("lastname");
        doNothing().when(author2).setLastName("newLastname");
        when(author1.getArticles()).thenReturn(null);
        //when(author2.getArticles()).thenReturn(authors1);
        when(authorRepository.save(author2)).thenReturn(author2);
        when(author2.toString()).thenReturn("author2");

        Author result = authorService.patch(author1);
        Assertions.assertEquals(author2.toString(), result.toString());
    }

    @Test
    void patchChangeArticles() throws NotFoundException, CantModifyItem {
        when(author1.getId()).thenReturn(Long.valueOf(1));
        when(authorRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(author2));
        when(author1.getFirstName()).thenReturn(null);
        //when(author2.getFirstName()).thenReturn("firstName");
        when(author1.getLastName()).thenReturn(null);
        //when(author2.getLastName()).thenReturn("lastname");
        when(author1.getArticles()).thenReturn(articles1);
        when(author2.getArticles()).thenReturn(articles2);
        Assertions.assertThrowsExactly(CantModifyItem.class, ()->{authorService.patch(author1);});
    }

    @Test
    void delete() throws NotFoundException {
        doNothing().when(authorRepository).deleteById(Long.valueOf(1));
        authorService.delete(Long.valueOf(1));
    }

    @Test
    void deleteWrong(){
        doThrow(EmptyResultDataAccessException.class).when(authorRepository).deleteById(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotFoundException.class, () -> {authorService.delete(Long.valueOf(1));});
    }
}