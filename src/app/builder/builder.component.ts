import { Component, OnInit } 	from '@angular/core';
import { FormsModule }			from '@angular/forms';


@Component({
	selector: 'app-builder',
	templateUrl: './builder.component.html',
	styleUrls: ['./builder.component.css']
})

export class BuilderComponent {
	test = {
		component: '',
		header: '',
		features: [],
		http: false,
		routing: false,
		form: false,
		verified: false,
		api: '',
		uses:<any> '',
		it: '',
		featuresValid:true
	}
	numberFeatures = 0;

  constructor() { }

	update() {
		console.log('1update(): %o', this.test);
		if(this.test.http){
			this.numberFeatures = 1
		}
		if(this.test.routing){
			this.numberFeatures = 1;
		}
		if(this.test.form){
			this.numberFeatures = 1;
		}
		if(this.test.http && this.test.routing) {
			this.numberFeatures = 2;
		}
		if(this.test.routing && this.test.form) {
			this.numberFeatures = 2;
		}
		if(this.test.form && this.test.http) {
			this.numberFeatures = 2;
		}
		if(this.test.form && this.test.http && this.test.routing) {
			this.numberFeatures = 3;
		}
		if(!this.test.form && !this.test.http && !this.test.routing) {
			this.numberFeatures = 0
		}
		console.log('2update(): %o', this.test);
	}

	next() {
		console.log('Features: %o', this.test);
		console.log('api:', this.test.api);
		this.test.header = `import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';\n`;
		if(this.test.http) {
			this.test.uses = 'http';
			this.test.features.push('HttpClientModule');
			this.test.header += `import { HttpClientModule } from '@angular/common/http';\n`;
			this.test.header += `import { ApiService } from '../api.service';\n`
		}
		if(this.test.routing) {
			this.test.uses = 'routing';
			this.test.features.push('RouterTestingModule.withRoutes([])');
			this.test.header += `import { RouterTestingModule } from '@angular/router/testing';\n`;
		}
		if(this.test.form) {
			this.test.features.push('FormsModule');
			this.test.header += `import { FormsModule } from '@angular/forms';\n`;
		}
		if(this.test.features.length>1) {
			if(this.test.uses==='http') {
				this.test.uses = `'let apiServiceStub:Partial<ApiService> = {\n\t\t${this.test.api};\n\t};'`
			}
		}
		if(this.test.features.length===0){
			console.log('this.test.features:', this.test.features);
			this.test.features.length = 1;
			this.test.featuresValid = false;
		}
		this.test.header += `\nimport { ${this.test.component} } from './${this.getComponentPath(this.test.component)}.component';`;
	}

	verify() {
		if(this.test.http && this.test.api === '') return alert('You must put in your api service function');
		console.log('verify() has:', this.test);
		this.test.verified = true;
		this.test.header += `\n\ndescribe('${this.test.component}', () => {\n`;
		this.test.header += `\tlet component: ${this.test.component};\n\tlet fixture: ComponentFixture<${this.test.component}>;`;
		if(this.test.http) {
			this.test.header += `\n\tlet apiServiceStub:Partial<ApiService> = {\n\t\t${this.test.api};\n\t};`;
		}
		if(this.test.form) {
			this.test.header += `\n\tlet hostElement;`;
		}
		this.test.header += `\n\n\tbeforeEach(async(() => {\n\t\tTestBed.configureTestingModule({\n\t\t\tdeclarations: [${this.test.component}]`;
		if(this.test.featuresValid){
			this.test.header += `\n\t\t\timports: [${this.test.features}]`;
		}
		this.test.header += `\n\t\t})\n\t\t.compileComponents();\n\t}));`;
		this.test.header += `\n\n\tbeforeEach(() => {\n\t\tfixture = TestBed.createComponent(${this.test.component});\n\t\tcomponent = fixture.componentInstance;\n\t\tfixture.detectChanges();`;
		if(this.test.form) {
			this.test.header += `\n\t\thostElement = fixture.debugElement.nativeElement;`;
		}
		this.test.header += `\n\t});`;
		this.test.it = `\n\n\tit('should create', () => {\n\t\texpect(component).toBeTruthy();\n\t});\n});`;
	}

	redo() {
		this.test.component = '';
		this.test.features = [];
		this.test.http = false;
		this.test.routing = false;
		this.test.form = false;
		this.test.verified = false;
		this.numberFeatures = 0;
	}

	getComponentPath(string) {
		return string.replace(/([a-z])([A-Z])/g, "$1-$2")
			.replace(/\s+/g, '-')
			.toLowerCase()
			.replace(/-component$/,'');
	}
	change(api) {
		console.log('change(api):', api);
		this.test.api = api.api;
	}
}
