import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ArticleService} from './article.service';
import { ArticleDto } from './dto/article.dto';
import { AuthGuard } from 'src/user/AuthGuard';
import { ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    
      
      @ApiCreatedResponse({
        description:"create new Article"
      })  
      @ApiSecurity('JWT-auth')
      @Post('/')
      async create(@Body() createArticleDto: ArticleDto) {
        try{
         return this.articleService.create(createArticleDto);
        }catch(error){
          throw error;
        }
      }
      
      @ApiCreatedResponse({
        description:"get all  Articles"
      })  
      @ApiSecurity('JWT-auth')
      @Get()
      @UseGuards(AuthGuard)
      findAll() {
        return this.articleService.findAll();
      }
      
      @ApiCreatedResponse({
        description:"get Article by id"
      })  
      @ApiSecurity('JWT-auth')
      @Get(':id')
      @UseGuards(AuthGuard)
      findOne(@Param('id') id: string) {
        return this.articleService.findOne(id);
      }
      
      @ApiCreatedResponse({
        description:"update article by id  "
      })  
      @ApiSecurity('JWT-auth')
      @Patch(':id')
      @UseGuards(AuthGuard)
      update(@Param('id') id: string, @Body() updateArticleDto: ArticleDto) {
        return this.articleService.update(id, updateArticleDto);
      }

      @ApiCreatedResponse({
        description:"delete article by id"
      }) 
      @ApiSecurity('JWT-auth')
      @Delete(':id')
      @UseGuards(AuthGuard)
      remove(@Param('id') id: string) {
        return this.articleService.remove(id);
      }


}
