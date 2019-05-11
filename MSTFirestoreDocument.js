import { Document } from 'firestorter';
import { onBecomeObserved, onBecomeUnobserved } from 'mobx';

/*const un1 = onBecomeObserved(todo, (event) => {
  console.log('onBecomeObserved: ', event);
});*/
/*const un2 = onBecomeUnobserved(todo, (event) => {
  console.log('onBecomeUnobserved: ', event);
});*/


Document.mst = function(model) {
  const obj = model.cloneAndEnhance({});

  const create = obj.create;
  obj.create = () => {
    const instance = create.apply(obj, arguments);
    let refCount = 0;
    const regs = [];
    Object.keys(model.properties).forEach((key) => {
      const prop = instance.$mobx.values[key];
      if (prop.isBeingObserved) {
        refCount++;
      }
      regs.push(onBecomeObserved(prop, () => {
        refCount++;
        console.log('onBecomeObserved: ', refCount);
      }));
      regs.push(onBecomeUnobserved(prop, () => {
        refCount--;
        console.log('onBecomeUnobserved: ', refCount);
      }));
      // instance.$mobx
    });
    return instance
  }

  return obj;
};

export default Document;