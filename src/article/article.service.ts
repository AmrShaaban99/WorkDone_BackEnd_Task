import { Injectable } from '@nestjs/common';
import{InjectModel}from '@nestjs/mongoose'
import { Article } from './entities/article.entity';
import { Model } from 'mongoose';
import { ArticleDto } from './dto/article.dto';
@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel:Model<Article>){}
  
    create(createArticleDto:ArticleDto) {
      try{
        const newArticle=new this.articleModel(createArticleDto)
        return newArticle.save()
      }catch(error){
        return {"error":error}
      }
    }

    async findAll() {
      return await this.articleModel.find().lean();
    }
    async findOne(id: string) {
      return await this.articleModel.findOne({"_id":id}).select({ _id: 0 }).lean();
    }
  
    async update(id: string, updateArticleDto: ArticleDto) {
      const article = await this.articleModel.findById(id);
      if (!article) return null;
      article.set(updateArticleDto);
      const updatedArticle = await article.save();
      return updatedArticle;
      
    }
    
    async remove(id: string) {
          return await this.articleModel.findByIdAndDelete(id);
    }

}
