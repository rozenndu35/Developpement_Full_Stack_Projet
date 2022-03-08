package com.esiea.blogAPI.service;

import com.esiea.blogAPI.exception.CantModifyItem;
import com.esiea.blogAPI.exception.NotAllowedException;
import com.esiea.blogAPI.exception.NotFoundException;
import com.esiea.blogAPI.model.Article;
import com.esiea.blogAPI.model.Category;
import com.esiea.blogAPI.repository.CategoryRepository;
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
class CategoryServiceTest {

    @Mock
    private Article article1 = mock(Article.class);
    @Mock
    private Article article2 = mock(Article.class);
    @Mock
    private Article article3 = mock(Article.class);
    @Mock
    private Category category1 = mock(Category.class);
    @Mock
    private Category category2 = mock(Category.class);
    @Mock
    private Category category3 = mock(Category.class);
    @Mock
    private CategoryRepository categoryRepository = mock(CategoryRepository.class);
    @InjectMocks
    private CategoryService categoryService;
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
    void getCategories() {
        List<Category> categories1 = new ArrayList<>();
        categories1.add(category1);
        categories1.add(category2);
        when(categoryRepository.findAll()).thenReturn(categories1);
        when(category1.toString()).thenReturn("category1");
        when(category2.toString()).thenReturn("category2");
        Iterable<Category> result = categoryService.getCategories();
        Iterator<Category> resultIterator = result.iterator();
        Assertions.assertEquals( "category1" ,resultIterator.next().toString());
        Assertions.assertEquals( "category2" ,resultIterator.next().toString());
    }

    @Test
    void getCategoryGood() throws NotFoundException {
        Long id = Long.valueOf(1);
        List<Category> categories1 = new ArrayList<>();
        when(categoryRepository.findById(id)).thenReturn(Optional.of(category1));
        when(category1.toString()).thenReturn("category1");
        Category result = categoryService.getCategory(id);
        Assertions.assertEquals( "category1" ,result.toString());
    }
    @Test
    void getCategoryWrong(){
        Long id = Long.valueOf(1);
        when(categoryRepository.findById(id)).thenReturn(Optional.empty());
        Assertions.assertThrowsExactly(NotFoundException.class, () ->{categoryService.getCategory(id);});
    }

    @Test
    void createCategoryIfNotExistSaveCategory() throws NotAllowedException, NotFoundException {
        when(category1.getId()).thenReturn(null);
        when(categoryRepository.save(category1)).thenReturn(category2);
        when(category2.toString()).thenReturn("category2");
        Category result = categoryService.CreateCategoryIfNotExist(category1);
        Assertions.assertEquals("category2", result.toString());
    }

    @Test
    void createCategoryIfNotExistGetCategory() throws NotAllowedException, NotFoundException {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category2.toString()).thenReturn("category2");
        when(category2.equalsOrNull(category1)).thenReturn(true);
        Category result = categoryService.CreateCategoryIfNotExist(category1);
        assertEquals("category2", result.toString());
    }

    @Test
    void createCategoryIfNotExistGetCategoryWrong() throws NotAllowedException {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category2.equalsOrNull(category1)).thenReturn(false);
        assertThrowsExactly(NotFoundException.class,()  ->{categoryService.CreateCategoryIfNotExist(category1);});
    }

    @Test
    void saveGood() throws NotAllowedException {
        when(categoryRepository.save(category1)).thenReturn(category2);
        // Le save rajoute un id, donc la catégorie retournée n'est pas la même que celle en entrée
        when(category2.toString()).thenReturn("category2");
        when(category1.getId()).thenReturn(null);
        Category result = categoryService.save(category1);
        Assertions.assertEquals("category2", result.toString());
    }

    @Test
    void saveWrong(){
        when(category1.getId()).thenReturn(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotAllowedException.class, () ->{categoryService.save(category1);});
    }

    @Test
    void replaceGood() throws NotAllowedException, NotFoundException {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(categoryRepository.save(category1)).thenReturn(category3);
        when(category3.toString()).thenReturn("category3");
        Category result = categoryService.replace(category1);
        Assertions.assertEquals("category3", result.toString());
    }

    @Test
    void replaceNotFoundException() throws NotAllowedException, NotFoundException {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.empty());
        Assertions.assertThrowsExactly(NotFoundException.class, ()->{ categoryService.replace(category1);});
    }

    @Test
    void testPatchWithoutChangeByNull() throws NotFoundException, CantModifyItem {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category1.getCategoryName()).thenReturn(null);
        //when(category2.getCategoryName()).thenReturn("categoryName");
        when(category1.getArticles()).thenReturn(null);
        //when(category2.getArticles()).thenReturn(articles1);
        when(categoryRepository.save(category2)).thenReturn(category2);
        when(category2.toString()).thenReturn("category2");

        Category result = categoryService.patch(category1);
        Assertions.assertEquals(category2.toString(), result.toString());
    }

    @Test
    void testPatchWithoutChangeBySameCategoryName() throws NotFoundException, CantModifyItem {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category1.getCategoryName()).thenReturn("categoryName");
        when(category2.getCategoryName()).thenReturn("categoryName");
        when(category1.getArticles()).thenReturn(null);
        //when(category2.getArticles()).thenReturn(articles1);
        when(categoryRepository.save(category2)).thenReturn(category2);
        when(category2.toString()).thenReturn("category2");

        Category result = categoryService.patch(category1);
        Assertions.assertEquals(category2.toString(), result.toString());
    }

    @Test
    void testPatchWithCategoryNameChange() throws NotFoundException, CantModifyItem {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category1.getCategoryName()).thenReturn("CategoryName1");
        when(category2.getCategoryName()).thenReturn("CategoryName2");
        doNothing().when(category2).setCategoryName("CategoryName1");
        when(category1.getArticles()).thenReturn(null);
        //when(category2.getArticles()).thenReturn(articles1);
        when(categoryRepository.save(category2)).thenReturn(category2);
        when(category2.toString()).thenReturn("category2");

        Category result = categoryService.patch(category1);
        Assertions.assertEquals(category2.toString(), result.toString());
    }

    @Test
    void testPatchWithoutChangeBySameGetArticles() throws NotFoundException, CantModifyItem {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category1.getCategoryName()).thenReturn(null);
        //when(category2.getCategoryName()).thenReturn("categoryName");
        when(category1.getArticles()).thenReturn(articles1);
        when(category2.getArticles()).thenReturn(articles1);
        when(categoryRepository.save(category2)).thenReturn(category2);
        when(category2.toString()).thenReturn("category2");

        Category result = categoryService.patch(category1);
        Assertions.assertEquals(category2.toString(), result.toString());
    }

    @Test
    void testPatchWithChangeGetArticles() throws NotFoundException, CantModifyItem {
        when(category1.getId()).thenReturn(Long.valueOf(1));
        when(categoryRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(category2));
        when(category1.getCategoryName()).thenReturn(null);
        //when(category2.getCategoryName()).thenReturn("categoryName");
        when(category1.getArticles()).thenReturn(articles1);
        when(category2.getArticles()).thenReturn(articles2);

        Assertions.assertThrowsExactly(CantModifyItem.class, ()->{categoryService.patch(category1);}); ;
    }

    @Test
    void delete() throws NotFoundException {
        doNothing().when(categoryRepository).deleteById(Long.valueOf(1));
        categoryService.delete(Long.valueOf(1));
    }

    @Test
    void deleteWrong() {
        doThrow(EmptyResultDataAccessException.class).when(categoryRepository).deleteById(Long.valueOf(1));
        Assertions.assertThrowsExactly(NotFoundException.class, () ->{categoryService.delete(Long.valueOf(1));});
    }
}