package com.esiea.blogAPI.service;

import com.esiea.blogAPI.exception.AuthorNotFoundException;
import com.esiea.blogAPI.exception.CategoryNotFoundException;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.model.Author;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.repository.ArticleRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.EmptyResultDataAccessException;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {
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
    private Category category1 = mock(Category.class);
    @Mock
    private Category category2 = mock(Category.class);
    @Mock
    private Category category3 = mock(Category.class);

    @Mock
    private ArticleRepository articleRepository= mock(ArticleRepository.class);
    @Mock
    private CategoryService categoryService = mock(CategoryService.class);
    @Mock
    private AuthorService authorService = mock(AuthorService.class);
    @InjectMocks
    private ArticleService articleService;
    private List<Article> articles1;
    private List<Article> articles2;
    @BeforeEach
    void setUp(){
        articles1 = new ArrayList<>();
        articles1.add(article1);
        articles1.add(article2);

        articles2 = new ArrayList<>();
        articles2.add(article2);
        articles2.add(article3);
    }

    /**
     * Test la récupération de l'ensemble des articles
     */
    @Test
    void getArticles() {
        when(articleRepository.findAll()).thenReturn(articles1);
        when(article1.toString()).thenReturn("article1");
        when(article2.toString()).thenReturn("article2");
        Iterable<Article> result = articleService.getArticles();
        Iterator<Article> resultIterator = result.iterator();
        Assertions.assertEquals( "article1" ,resultIterator.next().toString());
        Assertions.assertEquals( "article2" ,resultIterator.next().toString());
    }

    /**
     * Test la récupération d'un article
     * @throws NotFoundException
     */
    @Test
    void getArticleGood() throws NotFoundException {
        Long id = Long.valueOf(1);
        when(articleRepository.findById(id)).thenReturn(Optional.of(article1));
        when(article1.toString()).thenReturn("article1");
        Article result = articleService.getArticle(id);
        Assertions.assertEquals( "article1" ,result.toString());
    }

    /**
     * Test la récupération d'un article quand l'article n'est pas trouvé dans la base de données
     * @throws NotFoundException
     */
    @Test
    void getArticleWrong() throws NotFoundException {
        Long id = Long.valueOf(1);
        when(articleRepository.findById(id)).thenReturn(Optional.empty());
        Assertions.assertThrowsExactly(NotFoundException.class, () ->{articleService.getArticle(id);});
    }

    /**
     * Test la sauvegarde sans erreurs
     * @throws AuthorNotFoundException
     * @throws NotAllowedException
     * @throws CategoryNotFoundException
     * @throws NotFoundException
     */
    @Test
    void saveGood() throws AuthorNotFoundException, NotAllowedException, CategoryNotFoundException, NotFoundException {
        when(article1.getId()).thenReturn(null);

        when(article1.getAuthor()).thenReturn(author1);
        //when(article2.getAuthor()).thenReturn(author1);
        //when(author1.equalsOrNull(author1)).thenReturn(true);
        when(article1.getCategory()).thenReturn(category1);
        //when(article2.getCategory()).thenReturn(category1);
        //when(category1.equalsOrNull(category1)).thenReturn(true);

        when(authorService.CreateAuthorIfNotExist(author1)).thenReturn(author1);
        when(categoryService.CreateCategoryIfNotExist(category1)).thenReturn(category1);

        when(articleRepository.save(article1)).thenReturn(article3);
        when(article3.toString()).thenReturn("article3");
        Article result = articleService.save(article1);
        Assertions.assertEquals("article3", result.toString());
    }

    /**
     * Test la sauvegarde avec une erreur.
     * L'article ne peut pas être ajouté à la base de donnée, s'il dispose déjà d'un ID
     *
     * @throws AuthorNotFoundException
     * @throws NotAllowedException
     * @throws CategoryNotFoundException
     * @throws NotFoundException
     */
    @Test
    void saveWrong() throws AuthorNotFoundException, NotAllowedException, CategoryNotFoundException, NotFoundException {
        when(article1.getId()).thenReturn(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotAllowedException.class,() ->{articleService.save(article1);});
    }

    /**
     * Test la sauvegarde avec une erreur.
     * L'auteur de l'article possède un ID, mais ne correspond pas à celui de la bdd
     */
    @Test
    void saveAuthorNotFoundException() throws NotAllowedException, NotFoundException {
        when(article1.getId()).thenReturn(null);

        when(article1.getAuthor()).thenReturn(author1);

        when(authorService.CreateAuthorIfNotExist(author1)).thenThrow(NotFoundException.class);

        Assertions.assertThrowsExactly(AuthorNotFoundException.class, ()->{articleService.save(article1);});
    }

    /**
     * Test la sauvegarde avec une erreur.
     * La catégorie de l'article possède un ID, mais ne correspond pas à celui de la bdd
     */
    @Test
    void saveCategoryNotFoundException() throws NotAllowedException, NotFoundException {
        when(article1.getId()).thenReturn(null);
        when(article1.getAuthor()).thenReturn(author1);
        when(article1.getCategory()).thenReturn(category1);

        when(authorService.CreateAuthorIfNotExist(author1)).thenReturn(author1);
        when(categoryService.CreateCategoryIfNotExist(category1)).thenThrow(NotFoundException.class);

        Assertions.assertThrowsExactly(CategoryNotFoundException.class, ()->{articleService.save(article1);});
    }

    /**
     * Remplacement d'un article par un autre dans la bdd
     * @throws NotFoundException
     * @throws NotAllowedException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void replaceGood() throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Remplacement du titre
        doNothing().when(article2).setTitle("newTitle");
        when(article1.getTitle()).thenReturn("newTitle");

        // Remplacement du contenu de l'article
        doNothing().when(article2).setContent("newContent");
        when(article1.getContent()).thenReturn("newContent");

        // Remplacement de la date
        doNothing().when(article2).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        when(article1.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));

        // Récupération de l'auteur et de la categorie du nouvel article
        when(article1.getAuthor()).thenReturn(author1);
        when(article1.getCategory()).thenReturn(category1);

        // Création ou récupération de l'auteur et de la catégorie dans la BDD
        when(authorService.CreateAuthorIfNotExist(author1)).thenReturn(author1);
        when(categoryService.CreateCategoryIfNotExist(category1)).thenReturn(category1);

        // Remplacement de l'article
        when(articleRepository.save(article2)).thenReturn(article3);
        when(article3.toString()).thenReturn("article3");

        // Test du remplacement
        Article result = articleService.replace(article1);
        Assertions.assertEquals("article3", result.toString());

        // Vérification
        Mockito.verify(article2, Mockito.times(1)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(1)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(1)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(1)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(1)).setCategory(category1);
    }

    /**
     * Remplacement d'un article par un autre avec une erreur.
     * L'article ne dispose pas d'ID
     * @throws NotFoundException
     * @throws NotAllowedException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void replaceWithoutId() throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(null);
        when(articleRepository.findById(null)).thenReturn(Optional.empty());

        // Test de l'erreur généré
        Assertions.assertThrowsExactly(NotFoundException.class,()->{articleService.replace(article1);});

        // Vérification
        Mockito.verify(article2, Mockito.times(0)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(0)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(0)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(0)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(0)).setCategory(category1);
    }

    /**
     * Remplacement d'un article avec erreur.
     * L'auteur n'est pas trouvé dans la BDD
     * @throws NotFoundException
     * @throws NotAllowedException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void replaceWithBadAuthor() throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Remplacement du titre
        doNothing().when(article2).setTitle("newTitle");
        when(article1.getTitle()).thenReturn("newTitle");

        // Remplacement du contenu de l'article
        doNothing().when(article2).setContent("newContent");
        when(article1.getContent()).thenReturn("newContent");

        // Remplacement de la date
        doNothing().when(article2).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        when(article1.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));

        // Récupération de l'auteur du nouvel article
        when(article1.getAuthor()).thenReturn(author1);

        // Création ou récupération de l'auteur dans la BDD avec une erreur
        when(authorService.CreateAuthorIfNotExist(author1)).thenThrow(NotFoundException.class);

        // Test du remplacement
        Assertions.assertThrowsExactly(AuthorNotFoundException.class, ()->{articleService.replace(article1);});

        // Vérification
        Mockito.verify(article2, Mockito.times(1)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(1)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(1)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(0)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(0)).setCategory(category1);
    }

    /**
     * Remplacement d'un article avec erreur.
     * La catégorie n'est pas trouvé dans la BDD
     * @throws NotFoundException
     * @throws NotAllowedException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void replaceWithBadCategory() throws NotFoundException, NotAllowedException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Remplacement du titre
        when(article1.getTitle()).thenReturn("newTitle");

        // Remplacement du contenu de l'article
        when(article1.getContent()).thenReturn("newContent");

        // Remplacement de la date
        when(article1.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));

        // Récupération de l'auteur et de la categorie du nouvel article
        when(article1.getAuthor()).thenReturn(author1);
        when(article1.getCategory()).thenReturn(category1);

        // Création ou récupération de l'auteur et de la catégorie dans la BDD avec une erreur
        when(authorService.CreateAuthorIfNotExist(author1)).thenReturn(author1);
        when(categoryService.CreateCategoryIfNotExist(category1)).thenThrow(NotFoundException.class);

        // Test du remplacement
        Assertions.assertThrowsExactly(CategoryNotFoundException.class, ()->{articleService.replace(article1);});

        // Vérification
        Mockito.verify(article2, Mockito.times(1)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(1)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(1)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(1)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(0)).setCategory(category1);
    }

    /**
     * Met à jour l'ensemble des attributs d'un article
     * @throws NotAllowedException
     * @throws NotFoundException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void patchAll() throws NotAllowedException, NotFoundException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Remplacement du titre
        when(article1.getTitle()).thenReturn("newTitle");
        when(article2.getTitle()).thenReturn("oldTitle");

        // Remplacement du contenu de l'article
        when(article1.getContent()).thenReturn("newContent");
        when(article2.getContent()).thenReturn("oldContent");

        // Remplacement de la date
        when(article1.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));
        when(article2.getPublicationDate()).thenReturn(Timestamp.valueOf("2021-02-02 00:00:00"));

        // Récupération de l'auteur du nouvel article
        when(article1.getAuthor()).thenReturn(author1);
        when(article2.getAuthor()).thenReturn(author2);
        when(author2.equalsOrNull(author1)).thenReturn(false);

        when(authorService.CreateAuthorIfNotExist(author1)).thenReturn(author1);

        // Récupération de la categorie du nouvel article
        when(article1.getCategory()).thenReturn(category1);
        when(article2.getCategory()).thenReturn(category2);
        when(category2.equalsOrNull(category1)).thenReturn(false);

        when(categoryService.CreateCategoryIfNotExist(category1)).thenReturn(category1);

        // Mise à jour de l'article
        when(articleRepository.save(article2)).thenReturn(article3);
        when(article3.toString()).thenReturn("article3");

        // Test de la mise à jour
        Article result = articleService.patch(article1);
        Assertions.assertEquals("article3", result.toString());

        // Vérification
        Mockito.verify(article2, Mockito.times(1)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(1)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(1)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(1)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(1)).setCategory(category1);
    }

    /**
     * Ne met à jour aucun attribut puisque les attributs du nouvel article sont identiques
     * @throws NotAllowedException
     * @throws NotFoundException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void patchNoneBySame() throws NotAllowedException, NotFoundException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Pas de remplacement du titre
        when(article1.getTitle()).thenReturn("newTitle");
        when(article2.getTitle()).thenReturn("newTitle");

        // Pas de remplacement du contenu de l'article
        when(article1.getContent()).thenReturn("newContent");
        when(article2.getContent()).thenReturn("newContent");

        // Pas de remplacement de la date
        when(article1.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));
        when(article2.getPublicationDate()).thenReturn(Timestamp.valueOf("2022-02-02 00:00:00"));

        // Récupération de l'auteur du nouvel article
        when(article1.getAuthor()).thenReturn(author1);
        when(article2.getAuthor()).thenReturn(author1);
        when(author1.equalsOrNull(author1)).thenReturn(true);

        // Récupération de la categorie du nouvel article
        when(article1.getCategory()).thenReturn(category1);
        when(article2.getCategory()).thenReturn(category1);
        when(category1.equalsOrNull(category1)).thenReturn(true);

        // Mise à jour de l'article
        when(articleRepository.save(article2)).thenReturn(article3);
        when(article3.toString()).thenReturn("article3");

        // Test de la mise à jour
        Article result = articleService.patch(article1);
        Assertions.assertEquals("article3", result.toString());

        // Vérification
        Mockito.verify(article2, Mockito.times(0)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(0)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(0)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(0)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(0)).setCategory(category1);
    }

    /**
     * Ne met à jour aucun attribut puisque les attributs du nouvel article sont null
     * @throws NotAllowedException
     * @throws NotFoundException
     * @throws AuthorNotFoundException
     * @throws CategoryNotFoundException
     */
    @Test
    void patchNoneByNull() throws NotAllowedException, NotFoundException, AuthorNotFoundException, CategoryNotFoundException {
        // Récupération de l'article déjà existant
        when(article1.getId()).thenReturn(Long.valueOf(1));
        when(articleRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(article2));

        // Pas de remplacement du titre
        when(article1.getTitle()).thenReturn(null);

        // Pas de remplacement du contenu de l'article
        when(article1.getContent()).thenReturn(null);

        // Pas de remplacement de la date
        when(article1.getPublicationDate()).thenReturn(null);

        // Récupération de l'auteur du nouvel article
        when(article1.getAuthor()).thenReturn(null);

        // Récupération de la categorie du nouvel article
        when(article1.getCategory()).thenReturn(null);

        // Mise à jour de l'article
        when(articleRepository.save(article2)).thenReturn(article3);
        when(article3.toString()).thenReturn("article3");

        // Test de la mise à jour
        Article result = articleService.patch(article1);
        Assertions.assertEquals("article3", result.toString());

        // Vérification
        Mockito.verify(article2, Mockito.times(0)).setTitle("newTitle");
        Mockito.verify(article2, Mockito.times(0)).setContent("newContent");
        Mockito.verify(article2, Mockito.times(0)).setPublicationDate(Timestamp.valueOf("2022-02-02 00:00:00"));
        Mockito.verify(article2, Mockito.times(0)).setAuthor(author1);
        Mockito.verify(article2, Mockito.times(0)).setCategory(category1);
    }

    @Test
    void deleteGood() throws NotFoundException {
        articleService.delete(Long.valueOf(1));
        Mockito.verify(articleRepository, Mockito.times(1)).deleteById(Long.valueOf(1));
    }

    @Test
    void deleteWrong() throws NotFoundException {
        doThrow(EmptyResultDataAccessException.class).when(articleRepository).deleteById(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotFoundException.class, ()->{articleService.delete(Long.valueOf(1));});
        Mockito.verify(articleRepository, Mockito.times(1)).deleteById(Long.valueOf(1));
    }
}