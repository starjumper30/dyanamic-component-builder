import {
  Compiler,
  Component,
  NgModule,
  NgModuleFactory,
  ReflectiveInjector,
  SystemJsNgModuleLoader,
  ViewContainerRef
} from '@angular/core';
import { RouterModule } from '@angular/router';

export function createComponent(template: string, compiler: Compiler, span: ViewContainerRef) {
  const injector = ReflectiveInjector
    .fromResolvedProviders([], span.parentInjector);
// 1. Create module loader
  const loader = new SystemJsNgModuleLoader(compiler);
  loader.load('./dynamic/dynamic.module#DynamicModule')
    .then((nmf: NgModuleFactory<any>) => {
// 2. create NgModuleRef
      const ngmRef = nmf.create(injector);
// 3. Create component factory

      createDynamicFactory(injector, ngmRef.instance.constructor, template, compiler)
        .then((cmpF) => {
// Create the component
          const componentRef = span.createComponent(cmpF, 0, injector, []);
          componentRef.changeDetectorRef.detectChanges();
          componentRef.onDestroy(() => {
            componentRef.changeDetectorRef.detach();
          });
        });
    });
}

export function createDynamicFactory(injector, moduleClass, template: string, compiler) {
  @Component({
    selector: 'app-dynamic-html',
    template
  })
  class DynamicHtmlComponent {
  }

  @NgModule({
    imports: [moduleClass, RouterModule],
    declarations: [DynamicHtmlComponent],
    entryComponents: [DynamicHtmlComponent]
  })
  class DynamicModule {
  }

  return compiler
    .compileModuleAsync(DynamicModule)
    .then((ngMdlFactory) => {
      const ngMdlRef = ngMdlFactory.create(injector);
      return ngMdlRef.componentFactoryResolver
        .resolveComponentFactory(DynamicHtmlComponent);

    });
}
